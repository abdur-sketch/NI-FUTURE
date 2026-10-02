import { computeScores, type WeightedAnswer } from "./scoring.ts";

type CanonicalChoice = { id: string; weights: WeightedAnswer["weights"] };
type CanonicalQuestion = { id: string; choices: readonly CanonicalChoice[] };

export type AssessmentAnswer = { questionId: string; answerId: string };

export const canonicalQuestions: readonly CanonicalQuestion[] = [
  {id:"q1",choices:[{id:"design",weights:{creative:3,photo:1}},{id:"video",weights:{video:3,creative:1}},{id:"computer",weights:{technology:3,coding:2}}]},
  {id:"q2",choices:[{id:"visual",weights:{creative:3}},{id:"document",weights:{photo:3,video:2}},{id:"organize",weights:{business:3}}]},
  {id:"q3",choices:[{id:"poster",weights:{creative:3}},{id:"film",weights:{video:3}},{id:"app",weights:{coding:3,technology:2}}]},
  {id:"q4",choices:[{id:"see",weights:{creative:2,photo:2}},{id:"practice",weights:{technology:3,coding:1}},{id:"discuss",weights:{business:2,video:1}}]},
  {id:"q5",choices:[{id:"camera",weights:{photo:3,video:1}},{id:"code",weights:{coding:3,technology:2}},{id:"sell",weights:{business:3,creative:1}}]},
  {id:"q6",choices:[{id:"brand",weights:{creative:3,business:2}},{id:"shortfilm",weights:{video:3,photo:2}},{id:"website",weights:{coding:3,technology:2,creative:1}}]},
  {id:"q7",choices:[{id:"compose",weights:{creative:3,photo:2}},{id:"debug",weights:{coding:3,technology:2}},{id:"pitch",weights:{business:3}}]},
  {id:"q8",choices:[{id:"look",weights:{creative:3}},{id:"story",weights:{video:3}},{id:"shot",weights:{photo:3}}]},
  {id:"q9",choices:[{id:"useful",weights:{technology:3,coding:2}},{id:"memorable",weights:{video:2,photo:2,creative:1}},{id:"valuable",weights:{business:3}}]},
  {id:"q10",choices:[{id:"studio",weights:{creative:2,photo:2,video:2}},{id:"lab",weights:{technology:3,coding:3}},{id:"market",weights:{business:3,technology:1}}]},
] as const;

export class AssessmentPayloadError extends Error {}

export function scoreCanonicalAssessment(value: unknown) {
  if (!Array.isArray(value)) throw new AssessmentPayloadError("Jawaban pemetaan tidak valid.");
  if (value.length !== canonicalQuestions.length) throw new AssessmentPayloadError("Semua pertanyaan wajib dijawab tepat satu kali.");

  const received = new Map<string, string>();
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new AssessmentPayloadError("Format jawaban tidak valid.");
    const keys = Object.keys(item as Record<string, unknown>);
    if (keys.length !== 2 || !keys.includes("questionId") || !keys.includes("answerId")) {
      throw new AssessmentPayloadError("Jawaban memuat field yang tidak diizinkan.");
    }
    const { questionId, answerId } = item as Record<string, unknown>;
    if (typeof questionId !== "string" || typeof answerId !== "string") throw new AssessmentPayloadError("Format jawaban tidak valid.");
    if (received.has(questionId)) throw new AssessmentPayloadError("Pertanyaan tidak boleh dijawab lebih dari sekali.");
    received.set(questionId, answerId);
  }

  const weighted: WeightedAnswer[] = canonicalQuestions.map((question) => {
    const answerId = received.get(question.id);
    if (!answerId) throw new AssessmentPayloadError("Ada pertanyaan yang belum dijawab.");
    const choice = question.choices.find((candidate) => candidate.id === answerId);
    if (!choice) throw new AssessmentPayloadError("Pilihan jawaban tidak dikenal.");
    return { id: `${question.id}:${choice.id}`, weights: choice.weights };
  });

  for (const questionId of received.keys()) {
    if (!canonicalQuestions.some((question) => question.id === questionId)) throw new AssessmentPayloadError("Pertanyaan tidak dikenal.");
  }

  return { ...computeScores(weighted), answers: canonicalQuestions.map((q) => ({ questionId: q.id, answerId: received.get(q.id)! })) };
}
