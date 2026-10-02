import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { assertSafeDataTarget, firebaseProjectId } from "../lib/environment.ts";

function adminApp() {
  if (getApps().length) return getApp();
  const projectId = firebaseProjectId();
  assertSafeDataTarget(projectId);
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccount) {
    return initializeApp({ credential: cert(JSON.parse(serviceAccount)), projectId });
  }
  return initializeApp(projectId ? { projectId } : undefined);
}

export function getDb() { return getFirestore(adminApp()); }
export function clean(value: unknown, max = 120) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
export function validPhone(value: string) { return /^(?:\+62|62|0)8[1-9][0-9]{6,12}$/.test(value.replace(/[\s-]/g, "")); }
