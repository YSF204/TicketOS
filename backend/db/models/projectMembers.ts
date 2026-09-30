import { pgTable, pgEnum, uuid, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const projectRole = pgEnum("project_role", ["PROJECT_ADMIN", "PROJECT_MEMBER"]);

export const projectMembers = pgTable("project_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: projectRole("role").default("PROJECT_MEMBER").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => [unique().on(table.projectId, table.userId)]);
