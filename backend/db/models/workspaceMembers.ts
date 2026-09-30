import { pgTable, pgEnum, uuid, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const workspaceRole = pgEnum("workspace_role", ["OWNER", "ADMIN", "MEMBER"]);

export const workspaceMembers = pgTable("workspace_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: workspaceRole("role").default("MEMBER").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => [unique().on(table.workspaceId, table.userId)]);
