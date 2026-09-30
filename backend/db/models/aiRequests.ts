import { pgTable, pgEnum, uuid, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const aiRequestStatus = pgEnum("ai_request_status", ["SUCCEEDED", "FAILED"]);

export const aiRequests = pgTable("ai_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "set null" }),
  provider: varchar("provider", { length: 100 }).notNull(),
  model: varchar("model", { length: 150 }).notNull(),
  purpose: varchar("purpose", { length: 100 }).notNull(),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  status: aiRequestStatus("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
