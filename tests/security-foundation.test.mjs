import assert from "node:assert/strict";
import test from "node:test";
import { evaluateFixedWindow, loginCooldownSeconds } from "../lib/rate-limit.ts";
import { createResultToken, verifyResultToken } from "../lib/result-token.ts";
import { consultationSubmissionSchema, leadSubmissionSchema } from "../lib/validation.ts";
import { assertSafeDataTarget, PRODUCTION_PROJECT_ID, STAGING_PROJECT_ID } from "../lib/environment.ts";

process.env.RESULT_TOKEN_SECRET = "test-result-token-secret-that-is-long";

test("result token is scoped to document and expires", () => {
  const token=createResultToken("result-1",1_000);
  assert.equal(verifyResultToken(token,"result-1",2_000),true);
  assert.equal(verifyResultToken(token,"result-2",2_000),false);
  assert.equal(verifyResultToken(token,"result-1",8*24*60*60*1000),false);
  assert.equal(verifyResultToken(token+"tampered","result-1",2_000),false);
});

test("fixed-window limiter enforces threshold and resets", () => {
  const start=Date.parse("2026-10-03T00:00:00.000Z");
  assert.deepEqual(evaluateFixedWindow(undefined,2,60_000,start),{allowed:true,nextCount:1,windowStartedAt:new Date(start).toISOString(),retryAfterSeconds:0});
  assert.equal(evaluateFixedWindow({count:2,windowStartedAt:new Date(start).toISOString()},2,60_000,start+1_000).allowed,false);
  assert.equal(evaluateFixedWindow({count:2,windowStartedAt:new Date(start).toISOString()},2,60_000,start+60_000).allowed,true);
});

test("login cooldown is progressive and temporary", () => {
  assert.equal(loginCooldownSeconds(4),0);
  assert.equal(loginCooldownSeconds(5),60);
  assert.equal(loginCooldownSeconds(8),300);
  assert.equal(loginCooldownSeconds(12),1800);
});

test("canonical validation normalizes input and rejects unknown enums", () => {
  const lead=leadSubmissionSchema.parse({studentName:"  Ahmad  ",parentName:" Wali Ahmad ",phone:"0812 3456-7890",school:" SMP Nurul Iman ",interestLevel:"Sangat tertarik"});
  assert.equal(lead.studentName,"Ahmad");assert.equal(lead.phone,"081234567890");
  assert.equal(leadSubmissionSchema.safeParse({...lead,interestLevel:"INVALID"}).success,false);
  assert.equal(consultationSubmissionSchema.safeParse({...lead,topic:"INVALID",message:""}).success,false);
});

test("production guard aborts tests without emulator and blocks production targets", () => {
  const beforeNode=process.env.NODE_ENV,beforeEmulator=process.env.FIRESTORE_EMULATOR_HOST;
  process.env.NODE_ENV="test";delete process.env.FIRESTORE_EMULATOR_HOST;
  assert.throws(()=>assertSafeDataTarget(STAGING_PROJECT_ID),/tests require the Firestore emulator/);
  process.env.FIRESTORE_EMULATOR_HOST="127.0.0.1:8088";
  assert.throws(()=>assertSafeDataTarget(PRODUCTION_PROJECT_ID),/non-production code cannot access production/);
  if(beforeNode===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=beforeNode;
  if(beforeEmulator===undefined)delete process.env.FIRESTORE_EMULATOR_HOST;else process.env.FIRESTORE_EMULATOR_HOST=beforeEmulator;
});
