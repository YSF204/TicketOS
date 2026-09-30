import { pgTable, pgEnum, uuid, varchar, text, timestamp, date } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const taskStatus = pgEnum("task_status", ["TODO", "IN_PROGRESS", "BLOCKED", "DONE"]);
export const taskPriority = pgEnum("task_priority", ["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatus("status").default("TODO").notNull(),
  priority: taskPriority("priority").default("MEDIUM").notNull(),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  assignedTo: uuid("assigned_to").references(() => users.id, { onDelete: "set null" }),
  dueDate: date("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date())
});
