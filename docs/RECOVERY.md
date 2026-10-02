# Firestore Backup and Recovery

## Protected production resources

- Project: `ni-future-nurul-iman`
- Database: `(default)` in `asia-southeast1`
- Delete protection: enabled
- Point-in-Time Recovery: enabled (7-day retention)
- Export bucket: `gs://ni-future-nurul-iman-firestore-backups`
- Baseline export: `gs://ni-future-nurul-iman-firestore-backups/pre-redesign-2026-10-03`
- Bucket versioning and uniform bucket-level access: enabled

## BACKUP

1. Confirm the target project is exactly `ni-future-nurul-iman`.
2. Record the application commit and deployment build.
3. Start a Firestore managed export to a new timestamped prefix in the backup bucket.
4. Never overwrite an existing export prefix.
5. Wait for the Firestore long-running export operation to report `done: true`.

## VERIFY

1. Confirm the export operation completed without an `error` field.
2. List the export prefix and verify the metadata and collection output objects exist.
3. Record the export URI and operation name in the release notes.
4. Confirm PITR and delete protection remain enabled.
5. Never validate an export by importing it over production.

## RESTORE PROCEDURE

1. Stop application writes or place the affected feature in maintenance mode.
2. Preserve the damaged database with a new export when possible.
3. Prefer restoring into a new validation database/project first.
4. Verify collection counts, sampled schemas, relationships, and application reads.
5. For production recovery, use either Firestore PITR to a new database or managed import from the verified export.
6. Obtain explicit approval before replacing production data.
7. Re-enable traffic gradually and run public, admin, and data smoke tests.

Delete protection must only be disabled for an approved database deletion. It is not required for normal import or recovery operations.
