import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  passwordHash: varchar("password_hash", { length: 255 })
    .notNull(),

  firstName: varchar("first_name", { length: 100 })
    .notNull(),

  lastName: varchar("last_name", { length: 100 })
    .notNull(),

  avatarUrl: varchar("avatar_url", { length: 2048 }),

  emailVerified: boolean("email_verified")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});
