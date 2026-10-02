export const PRODUCTION_PROJECT_ID = "ni-future-nurul-iman";
export const STAGING_PROJECT_ID = "ni-future-nurul-iman-stg";

export type AppEnvironment = "production" | "staging" | "test" | "development";

export function firebaseProjectId() {
  if (process.env.GOOGLE_CLOUD_PROJECT) return process.env.GOOGLE_CLOUD_PROJECT;
  if (process.env.GCLOUD_PROJECT) return process.env.GCLOUD_PROJECT;
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID;
  try {
    return JSON.parse(process.env.FIREBASE_CONFIG ?? "{}").projectId as string | undefined;
  } catch {
    return undefined;
  }
}

export function appEnvironment(projectId = firebaseProjectId()): AppEnvironment {
  if (process.env.NODE_ENV === "test") return "test";
  if (projectId === PRODUCTION_PROJECT_ID) return "production";
  if (projectId === STAGING_PROJECT_ID) return "staging";
  return "development";
}

export function assertSafeDataTarget(projectId = firebaseProjectId()) {
  const environment = appEnvironment(projectId);
  const emulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST);

  if (environment === "test" && !emulator) {
    throw new Error("Safety guard: tests require the Firestore emulator.");
  }
  if (projectId === PRODUCTION_PROJECT_ID && process.env.NODE_ENV !== "production") {
    throw new Error("Safety guard: non-production code cannot access production Firestore.");
  }
  if (environment === "staging" && projectId !== STAGING_PROJECT_ID) {
    throw new Error("Safety guard: staging must use the staging Firebase project.");
  }
  return { environment, projectId, emulator };
}
