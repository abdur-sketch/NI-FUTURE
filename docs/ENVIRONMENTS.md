# Environment Isolation

| Environment | Firebase project | Firestore | Hosting |
|---|---|---|---|
| Production | `ni-future-nurul-iman` | Dedicated `(default)` | Firebase App Hosting backend `ni-future` |
| Staging | `ni-future-nurul-iman-stg` | Dedicated `(default)` | Firebase App Hosting backend `ni-future-staging` |
| Development/Test | Emulator project `ni-future-local-test` | Firestore emulator only | Local Next.js |

Production and staging use secrets with identical names but independent values in each Google Cloud project. No staging secret or service account points to production.

## Guard behavior

- Tests abort unless `FIRESTORE_EMULATOR_HOST` is present.
- Non-production processes abort if their resolved Firebase project is `ni-future-nurul-iman`.
- The production project is recognized only when the runtime is a production Next.js process.
- Migration and seed scripts must import and call `assertSafeDataTarget` before creating a Firestore client.

Use explicit aliases:

```bash
npx firebase use production
npx firebase use staging
```

Never copy production service-account JSON into local, test, or staging configuration.

Staging deploys use `firebase.staging.json`; production deploys use `firebase.json`. This prevents a backend ID from being accidentally resolved in the wrong project.
