# NI FUTURE Current Data Contract

Baseline: `1921998832fae17e4b5b3dcde682dbd52784015f`

This document records the pre-redesign Firestore contract. Phase 0.5 does not migrate or delete legacy application records. New security rate-limit records are isolated in `securityRateLimits`.

## Common conventions

- Application timestamps are ISO-8601 UTC strings for legacy compatibility.
- Document IDs are Firestore-generated IDs.
- Fields not listed as required are optional and must remain readable when absent.
- Unknown legacy fields must be preserved by future migrations.

## `leads`

Required for all records: `studentName`, `parentName`, `phone`, `school`, `source`, `status`, `createdAt`, `updatedAt`.

Optional by source: `interestLevel`, `topCategory`, `secondCategory`, `concern`.

Sources: `INTEREST_CTA`, `INTEREST_MAPPING`, `CONSULTATION`.

Statuses: `NEW`, `INTERESTED`, `CONSULTATION`.

Writers: `POST /api/leads`, `POST /api/interest`, `POST /api/consultation`.

Reader: authenticated `/admin` dashboard.

## `interestSessions`

Required: `leadId`, `studentName`, `rawAnswers`, `categoryScores`, `topCategory`, `secondCategory`, `completedAt`.

`leadId` references a `leads` document. `rawAnswers` remains an ordered array of canonical answer IDs. `categoryScores` is a map keyed by `creative`, `video`, `photo`, `technology`, `coding`, and `business`.

Writer: `POST /api/interest`.

Reader: token-protected `GET /api/interest`.

## `consultations`

Required: `leadId`, `topic`, `message`, `status`, `createdAt`.

`leadId` references the lead created in the same atomic batch. Existing status: `REQUESTED`.

Writer: `POST /api/consultation`.

## `rateLimits` (legacy)

Fields: `count`, `day`, `updatedAt`. This collection is retained for legacy compatibility and is not written by Phase 0.5 code.

## `securityRateLimits` (additive security collection)

Used only for endpoint abuse protection. Fields may include `kind`, `scope`, `count`, `failureCount`, `windowStartedAt`, `blockedUntil`, `updatedAt`, and Firestore Timestamp `expiresAt`. Document IDs are HMAC hashes; raw IP addresses, emails, and phone numbers are not stored. TTL is configured on `expiresAt`.

## Compatibility rules

1. Do not rename or remove existing fields.
2. Readers must tolerate missing optional fields.
3. Future schema changes must be additive and versioned.
4. Never infer that one guardian phone equals one student without an explicit product decision.
5. Re-audit production immediately before any migration because production can change after this snapshot.
