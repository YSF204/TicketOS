import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import jwt from "jsonwebtoken";

const testDatabaseUrl = process.env.TEST_DATABASE_URL;

test("workspace and project routes enforce authentication and workspace roles", {
  skip: !testDatabaseUrl && "Set TEST_DATABASE_URL to a migrated, dedicated test database.",
}, async () => {
  process.env.DATABASE_URL = testDatabaseUrl!;
  process.env.JWT_SECRET = randomUUID();

  const [{ default: app }, { db }] = await Promise.all([
    import("../app.ts"),
    import("../db/index.ts"),
  ]);
  const server = app.listen(0, "127.0.0.1");
  const users: { id: string; email: string; token: string }[] = [];

  try {
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.once("listening", resolve);
    });

    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const request = (path: string, options: {
      method?: string;
      token?: string;
      body?: unknown;
    } = {}) => fetch(`${baseUrl}${path}`, {
      method: options.method ?? "GET",
      headers: {
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
        ...(options.body ? { "content-type": "application/json" } : {}),
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    });

    const register = async (label: string) => {
      const email = `${label}-${randomUUID()}@example.test`;
      const response = await request("/api/auth/register", {
        method: "POST",
        body: {
          firstName: label,
          lastName: "IntegrationTest",
          email,
          confirmEmail: email,
          password: "integration-test-password",
        },
      });
      assert.equal(response.status, 201, `register ${label}`);
      const user = await response.json() as { id: string };
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!);
      users.push({ ...user, email, token });
      return users.at(-1)!;
    };

    const [owner, member, admin, outsider, adminAddedMember] = await Promise.all([
      register("Owner"), register("Member"), register("Admin"), register("Outsider"), register("AdminAddedMember"),
    ]);

    const unauthenticated = await request("/api/workspaces", { method: "POST", body: { name: "No token", slug: "no-token" } });
    assert.equal(unauthenticated.status, 401);

    const workspaceResponse = await request("/api/workspaces", {
      method: "POST",
      token: owner.token,
      body: { name: "Authorization test", slug: `authz-${randomUUID()}` },
    });
    assert.equal(workspaceResponse.status, 201);
    const workspace = await workspaceResponse.json() as { id: string };
    const projectsPath = `/api/workspaces/${workspace.id}/projects`;

    for (const [user, role] of [[member, "MEMBER"], [admin, "ADMIN"]] as const) {
      const added = await request(`/api/workspaces/${workspace.id}/members`, {
        method: "POST",
        token: owner.token,
        body: { userId: user.id, role },
      });
      assert.equal(added.status, 201, `owner can add ${role}`);
    }

    const memberCannotAdd = await request(`/api/workspaces/${workspace.id}/members`, {
      method: "POST",
      token: member.token,
      body: { userId: outsider.id, role: "MEMBER" },
    });
    assert.equal(memberCannotAdd.status, 403, "workspace member cannot add members");

    const adminCanAdd = await request(`/api/workspaces/${workspace.id}/members`, {
      method: "POST",
      token: admin.token,
      body: { userId: adminAddedMember.id, role: "MEMBER" },
    });
    assert.equal(adminCanAdd.status, 201, "workspace admin can add members");

    const ownerProjectResponse = await request(projectsPath, {
      method: "POST",
      token: owner.token,
      body: { name: "Owner project" },
    });
    assert.equal(ownerProjectResponse.status, 201);
    const ownerProject = await ownerProjectResponse.json() as { id: string };

    const memberProjectResponse = await request(projectsPath, {
      method: "POST",
      token: member.token,
      body: { name: "Member project" },
    });
    assert.equal(memberProjectResponse.status, 201, "workspace member can create a project");
    const memberProject = await memberProjectResponse.json() as { id: string };

    const memberList = await request(projectsPath, { token: member.token });
    assert.equal(memberList.status, 200, "workspace member can list projects");
    assert.equal((await memberList.json() as { id: string }[]).length, 2);

    const memberGet = await request(`${projectsPath}/${ownerProject.id}`, { token: member.token });
    assert.equal(memberGet.status, 200, "workspace member can view a project");

    const outsiderGet = await request(`${projectsPath}/${ownerProject.id}`, { token: outsider.token });
    assert.equal(outsiderGet.status, 403, "nonmember cannot view projects");

    const memberUpdate = await request(`${projectsPath}/${ownerProject.id}`, {
      method: "PATCH", token: member.token, body: { name: "Unauthorized edit" },
    });
    assert.equal(memberUpdate.status, 403, "workspace member cannot edit projects");

    const adminUpdate = await request(`${projectsPath}/${ownerProject.id}`, {
      method: "PATCH", token: admin.token, body: { name: "Admin edited project" },
    });
    assert.equal(adminUpdate.status, 200, "workspace admin can edit projects");

    const ownerUpdate = await request(`${projectsPath}/${ownerProject.id}`, {
      method: "PATCH", token: owner.token, body: { name: "Owner edited project" },
    });
    assert.equal(ownerUpdate.status, 200, "workspace owner can edit projects");

    const memberDelete = await request(`${projectsPath}/${memberProject.id}`, {
      method: "DELETE", token: member.token,
    });
    assert.equal(memberDelete.status, 403, "workspace member cannot delete projects");

    const adminDelete = await request(`${projectsPath}/${memberProject.id}`, {
      method: "DELETE", token: admin.token,
    });
    assert.equal(adminDelete.status, 204, "workspace admin can delete projects");

    const ownerDelete = await request(`${projectsPath}/${ownerProject.id}`, {
      method: "DELETE", token: owner.token,
    });
    assert.equal(ownerDelete.status, 204, "workspace owner can delete projects");
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    if (users.length) {
      await db.$client.query("DELETE FROM workspaces WHERE owner_id = ANY($1::uuid[])", [users.map((user) => user.id)]);
      await db.$client.query("DELETE FROM users WHERE id = ANY($1::uuid[])", [users.map((user) => user.id)]);
    }
    await db.$client.end();
  }
});
