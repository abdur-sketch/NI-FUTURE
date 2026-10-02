import { env } from "cloudflare:workers";

const statements = [
  `CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, student_name TEXT NOT NULL, parent_name TEXT NOT NULL, phone TEXT NOT NULL, school TEXT NOT NULL, source TEXT NOT NULL, interest_level TEXT, top_category TEXT, second_category TEXT, concern TEXT, status TEXT NOT NULL DEFAULT 'NEW', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads(phone)`,
  `CREATE INDEX IF NOT EXISTS leads_created_idx ON leads(created_at)`,
  `CREATE TABLE IF NOT EXISTS interest_sessions (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, raw_answers TEXT NOT NULL, category_scores TEXT NOT NULL, top_category TEXT NOT NULL, second_category TEXT NOT NULL, completed_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS consultations (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, topic TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'REQUESTED', created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS follow_ups (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, note TEXT NOT NULL, next_follow_up TEXT, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS content_entries (id TEXT PRIMARY KEY, type TEXT NOT NULL, slug TEXT NOT NULL, data TEXT NOT NULL, published INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL)`,
];
export async function getD1(){if(!env.DB)throw new Error("Database binding unavailable");await env.DB.batch(statements.map(sql=>env.DB.prepare(sql)));return env.DB}
export function clean(value:unknown,max=120){return typeof value==="string"?value.trim().slice(0,max):""}
export function validPhone(value:string){return /^(?:\+62|62|0)8[1-9][0-9]{6,12}$/.test(value.replace(/[\s-]/g,""))}
