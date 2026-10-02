import assert from "node:assert/strict";
import test from "node:test";
import { AssessmentPayloadError, canonicalQuestions, scoreCanonicalAssessment } from "../lib/assessment-config.ts";
import { questions as publicQuestions } from "../app/minat/questions.ts";

const validAnswers = canonicalQuestions.map((question) => ({ questionId: question.id, answerId: question.choices[0].id }));

test("canonical assessment accepts exactly one valid answer per question", () => {
  const result = scoreCanonicalAssessment(validAnswers);
  assert.equal(result.answers.length, 10);
  assert.equal(result.top, "creative");
});

test("client catalog exposes IDs but no scoring weights", () => {
  assert.deepEqual(publicQuestions.map((q) => [q.id, q.choices.map((c) => c.id)]), canonicalQuestions.map((q) => [q.id, q.choices.map((c) => c.id)]));
  assert.equal(JSON.stringify(publicQuestions).includes("weights"), false);
});

for (const [name, mutate] of [
  ["manipulated weight", (answers) => answers.map((a, i) => i ? a : {...a, weights:{creative:99}})],
  ["invalid answer ID", (answers) => answers.map((a, i) => i ? a : {...a, answerId:"unknown"})],
  ["invalid question ID", (answers) => answers.map((a, i) => i ? a : {...a, questionId:"q999"})],
  ["duplicate question", (answers) => answers.map((a, i) => i===1 ? {...a, questionId:"q1"} : a)],
  ["missing answer", (answers) => answers.slice(0,-1)],
  ["extra answer", (answers) => [...answers,{questionId:"q11",answerId:"extra"}]],
  ["malformed payload", () => [{questionId:"q1"}]],
]) test(`assessment rejects ${name}`, () => assert.throws(() => scoreCanonicalAssessment(mutate(structuredClone(validAnswers))), AssessmentPayloadError));
