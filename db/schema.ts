import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(), studentName: text("student_name").notNull(), parentName: text("parent_name").notNull(), phone: text("phone").notNull(), school: text("school").notNull(), source: text("source").notNull(), interestLevel: text("interest_level"), topCategory: text("top_category"), secondCategory: text("second_category"), concern: text("concern"), status: text("status").notNull().default("NEW"), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});
export const interestSessions = sqliteTable("interest_sessions", { id: text("id").primaryKey(), leadId: text("lead_id").notNull(), rawAnswers: text("raw_answers").notNull(), categoryScores: text("category_scores").notNull(), topCategory: text("top_category").notNull(), secondCategory: text("second_category").notNull(), completedAt: text("completed_at").notNull() });
export const consultations = sqliteTable("consultations", { id: text("id").primaryKey(), leadId: text("lead_id").notNull(), topic: text("topic").notNull(), message: text("message"), status: text("status").notNull().default("REQUESTED"), createdAt: text("created_at").notNull() });
export const followUps = sqliteTable("follow_ups", { id: text("id").primaryKey(), leadId: text("lead_id").notNull(), note: text("note").notNull(), nextFollowUp: text("next_follow_up"), createdAt: text("created_at").notNull() });
export const contentEntries = sqliteTable("content_entries", { id: text("id").primaryKey(), type: text("type").notNull(), slug: text("slug").notNull(), data: text("data").notNull(), published: integer("published", { mode: "boolean" }).notNull().default(false), updatedAt: text("updated_at").notNull() });
