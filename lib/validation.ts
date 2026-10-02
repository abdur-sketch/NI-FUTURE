import { z } from "zod";

export const interestLevels = [
  "Sangat tertarik",
  "Masih mempertimbangkan",
  "Ingin konsultasi",
  "Ingin melihat sekolah",
  "Ingin mengetahui biaya",
  "Siap mendaftar",
] as const;

export const consultationTopics = [
  "Program",
  "Biaya",
  "Beasiswa",
  "Anak belum mau mondok",
  "Takut tidak betah",
  "Minat anak",
  "Kuliah",
  "PKL",
  "Lainnya",
] as const;

export const leadSources = ["INTEREST_CTA", "INTEREST_MAPPING", "CONSULTATION"] as const;
export const leadStatuses = ["NEW", "INTERESTED", "CONSULTATION"] as const;

const requiredText = (label: string, max = 120) =>
  z.string({ error: `${label} wajib diisi.` }).trim().min(2, `${label} wajib diisi.`).max(max, `${label} terlalu panjang.`);

export function normalizePhone(value: string) {
  return value.trim().replace(/[\s-]/g, "");
}

const phone = z.string().transform(normalizePhone).pipe(
  z.string().regex(/^(?:\+62|62|0)8[1-9][0-9]{6,12}$/, "Nomor WhatsApp tidak valid."),
);

export const profileSchema = z.object({
  studentName: requiredText("Nama siswa"),
  parentName: requiredText("Nama wali"),
  school: requiredText("Asal sekolah"),
  phone,
}).strict();

export const leadSubmissionSchema = profileSchema.extend({
  interestLevel: z.enum(interestLevels),
}).strict();

export const consultationSubmissionSchema = profileSchema.extend({
  topic: z.enum(consultationTopics),
  message: z.string().trim().max(600, "Pesan terlalu panjang.").optional().default(""),
}).strict();

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(180).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(200),
}).strict();

export function validationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Data belum lengkap atau tidak valid.";
}
