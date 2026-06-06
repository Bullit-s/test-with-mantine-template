# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Frontend scaffolded from [bun-vite-template](https://github.com/LewisDamy/bun-vite-template)
(Bun, Vite, React, Mantine, Vitest, Storybook). The repo also holds the draft
product conception, backend GraphQL schema, query fragments, and example data.

### Commands

```bash
bun install
bun run dev
# → http://localhost:5173 (если порт занят — смотрите URL в терминале)

bun run build
bun run test
bun run lint
bun run typecheck
bun run validate
bun run storybook
# → http://localhost:6006
```

`docs/conception.md` (and its Russian twin `conception_ru.md`, same content) is a
**draft conception, not a frozen spec**. It states product intent, explicitly
leaves UX, architecture, and tooling to the developer, and contains examples,
open questions, and work marked as future backend changes. Treat it as a
starting point to discuss with the product owner — not a checklist to implement
verbatim. Read it directly when you need detail; this file intentionally does
not restate it.

## Repository layout

- `src/` — React application (from bun-vite-template).
- `docs/conception.md` / `conception_ru.md` — the draft conception (EN / RU).
- `schema/ent.graphql` — backend GraphQL schema (gqlgen-generated, large; a
  read-only reference for field types). `schema/orm.graphql` — hand-written
  schema additions.
- `queries/CustomerAggregate.gql`, `queries/RequestAggregate.gql` — GraphQL
  fragments: the customer-visible subset of the backend `Customer` / `Request`
  types.
- `examples/cabinet-response.json` — a sample payload to develop the UI against
  before a backend resolver exists.
- `examples/invoice.ts` — reference invoice helpers.

## Domain orientation

The product is a customer cabinet ("личный кабинет") for tracking purchases of
industrial equipment. The conception centers navigation on the **Request** —
proposals, invoices, orders, shipments and UPDs are described as documents nested
inside a request. The lifecycle diagram and the RU↔EN glossary are in
conception.md §3 and §6.

## Things worth checking before writing code

Pointers into the draft — verify against the conception and the schema, and
expect them to evolve:

- conception.md §8 shows *one example* of composing the two fragments into a
  query. It is illustrative — the query shape is not fixed.
- conception.md §8.1 lists backend work not yet in `schema/ent.graphql` (the
  `proposals` edge and `Proposal` type); `RequestAggregate.gql` already selects
  it, so it appears only in `examples/cabinet-response.json` for now.
- conception.md §9 and §14 collect non-obvious backend data behavior — money and
  VAT, epoch-second timestamps, sentinel values, one-currency-per-invoice.
  Consult them before parsing or formatting backend data.
- conception.md §4 covers session handling (cookie-based, external login, no
  login form); §13 covers non-functional notes (Russian-only UI for the current
  stage, mobile-first). Endpoint and login URLs are environment-configured.

## Stages

The conception frames the current stage as a read-only cabinet; mutations, chat,
notifications and i18n are described as later stages (conception.md §5, §12) and
may be re-scoped.
