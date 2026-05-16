# Cargo-List — Dispatcher Cargo List (Test Task)

Frontend test topshirig'i: `https://api.sarbon.me/v1/dispatchers/cargo/all` API'siga ulangan dispetcher uchun yuk ro'yxati sahifasi. Loyiha Feature-Sliced Design (FSD) arxitekturasi asosida qurilgan.

## Live & Repository

- **Repository**: https://github.com/ibrohimdev7/Cargo-List
- **Live demo**: _(Vercel deploy URL bu yerga qo'shiladi)_
- **Asosiy sahifa**: `/<locale>/dispatcher/cargo` — masalan https://your-app.vercel.app/uz/dispatcher/cargo

## Tech stack

| Concern        | Choice                                                              |
| -------------- | ------------------------------------------------------------------- |
| Framework      | **Next.js 16** (App Router, Turbopack, Server Components, `proxy.ts`) |
| Language       | **TypeScript** strict + `noUncheckedIndexedAccess`                  |
| UI             | **Tailwind CSS v4** + Radix UI + lucide-react                       |
| State / Forms  | Zustand · react-hook-form · zod                                     |
| i18n           | **next-intl** (uz, ru, en)                                           |
| HTTP           | Native `fetch` (BaseService wrapper)                                |
| Architecture   | **Feature-Sliced Design**                                           |
| Lint           | ESLint flat config (FSD layer boundary enforced)                    |

## Sahifa: `/[locale]/dispatcher/cargo`

Server-side render (per request — `cache: "no-store"`). Topshiriqdagi barcha talablar:

| Talab                          | Realizatsiya |
| ------------------------------ | ----------- |
| Header                         | Sahifa sarlavhasi + jami yuklar soni |
| Filter panel                   | Status · Sort (newest/oldest) · Limit (10/20/50) — URL `searchParams` orqali |
| Cargo table                    | Desktop'da `<table>`, mobile'da kartochka stack — bir xil data, alohida markup |
| Pagination                     | Previous · Current page · Next — server qayta render qiladi |
| Loading state                  | `loading.tsx` da skeleton (table + cards) |
| Error state                    | `error.tsx` — xato xabari + qayta urinish tugmasi |
| Empty state                    | "Yuklar topilmadi" + tushuntiruvchi matn |
| 3 ta til                       | uz / ru / en, `src/shared/translations/locales/*.json` |
| Responsive                     | Tailwind `md:` breakpoint'lari, mobile-first |
| Console toza                   | Build + dev'da error/warning yo'q |
| Token .env'dan                 | `SARBON_CLIENT_TOKEN`, `SARBON_USER_TOKEN` server-only |

## Architecture (FSD)

```
src/
  app/[locale]/
    dispatcher/cargo/
      page.tsx        ← server component, fetches & renders
      loading.tsx     ← skeleton during prerender
      error.tsx       ← error boundary (client)
  widgets/
    navbar/           ← top nav + LocaleSwitcher
    footer/
    cargo-table/      ← responsive table + mobile cards + skeleton
    cargo-filter/     ← status / sort / limit selects (client)
    pagination/       ← prev / current / next (client)
  features/           ← reserved for user actions (login, like, etc.)
  entities/
    cargo/
      api/cargo.api.ts   ← cargoList / cargoDetail
      model/types.ts     ← Cargo, CargoPayment, CargoRoutePoint, …
      lib/format.ts      ← formatRoute, formatPrice, getCargoTypeName
      ui/                ← CargoStatusBadge, CargoInfo
  shared/
    api/
      base-service.ts    ← BaseService (get/post/put/patch/delete)
      with-server-api.ts ← server wrapper, injects Sarbon headers
      fetch-error.ts     ← FetchError / FetchTimeoutError / FetchNetworkError
    ui/                  ← Button, Input, Dialog, Select, Skeleton
    lib/cn.ts            ← clsx + tw-merge
    config/env.ts        ← typed env boundary
    translations/locales/{uz,ru,en}.json
  i18n/                  ← next-intl routing/request/navigation
  proxy.ts               ← Next 16 proxy (locale routing, was middleware.ts)
```

**FSD import yo'nalishi** `app → widgets → features → entities → shared`, ESLint `no-restricted-imports` orqali enforce qilingan.

## API integration

**Endpoint**: `GET https://api.sarbon.me/v1/dispatchers/cargo/all`

**Required headers** har bir requestda yuboriladi (server-side, `withServerApi` orqali):
- `X-Device-Type: web`
- `X-Language: <locale>` — joriy lokal (uz/ru/en)
- `X-Client-Token: $SARBON_CLIENT_TOKEN`
- `X-User-Token: $SARBON_USER_TOKEN`

**Query params**: `page`, `limit`, `sort`, `status` (default `created_at:desc` + `SEARCHING_ALL`).

**Response shape** real javobdan generate qilingan (`src/entities/cargo/model/types.ts`):
```ts
ResDataType<{ items: Cargo[]; total: number }>
```

Hech qachon `try/catch` bilan yashiritilgan — `FetchError` throw qilinadi va `error.tsx` ushlab qoladi.

## Ishga tushirish

```bash
# 1. Loyihani klonlash
git clone https://github.com/ibrohimdev7/Cargo-List.git
cd Cargo-List

# 2. Node 20.9+ kerak (Next 16 talabi)
node --version

# 3. Paketlar
npm install

# 4. Tokenlar
cp .env.example .env.local       # tokenlar allaqachon ichida bor (test task uchun)

# 5. Ishga tushirish
npm run dev                       # http://localhost:3000 → /uz/dispatcher/cargo
npm run build && npm start        # production
```

**Foydali scripts**:
```bash
npm run dev          # next dev (Turbopack)
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run check        # typecheck + lint
```

## Deployment (Vercel)

1. https://vercel.com/new → import GitHub repository
2. Environment variables (`.env.local` dan ko'chir):
   - `NEXT_PUBLIC_CLIENT_API=https://api.sarbon.me/v1`
   - `NEXT_PUBLIC_DEFAULT_LOCALE=uz`
   - `SARBON_CLIENT_TOKEN=...`
   - `SARBON_USER_TOKEN=...`
3. Deploy

## Next.js 16 nuanslari

- `middleware.ts` → **`proxy.ts`** (`export function proxy`)
- `cookies()`, `headers()`, `params`, `searchParams` — **async** (`await` shart)
- `PageProps<'/[locale]/dispatcher/cargo'>` globallar `npx next typegen` orqali
- `next lint` olib tashlangan — `eslint` to'g'ridan-to'g'ri
- Turbopack default
