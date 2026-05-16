# FSD Architecture

Bu loyiha **Feature-Sliced Design** metodologiyasi asosida qurilgan. Har bir qatlamning aniq mas'uliyati bor va import faqat yuqoridan pastga yo'naladi.

## Import Yo'nalishi (Layer Dependency)

```
app → widgets → features → entities → shared
```

- **app** har qanday qatlamdan import qila oladi.
- **widgets** features/entities/shared dan import qiladi.
- **features** entities/shared dan import qiladi.
- **entities** faqat shared dan import qiladi.
- **shared** hech qaysi qatlamdan import qilmaydi.

> Yon-ga (siblings: feature → feature) import **taqiqlanadi**. Agar kerak bo'lsa, umumiy mantiqni quyi qatlamga ko'tarish kerak.

## Qatlamlar

| Qatlam   | Mas'uliyat                                                                            |
| -------- | ------------------------------------------------------------------------------------- |
| app      | Routing (Next App Router), providerlar, global stillar, metadata, RSC entrypoint     |
| widgets  | Sahifa darajasidagi katta bloklar (navbar, footer, cargo-card, filter, pagination)    |
| features | Foydalanuvchi harakatlari / use-case'lar (login, add-to-cart, favorite-toggle)        |
| entities | Biznes domenlar (cargo, profile, order, catalogue) — api/model/ui/lib                 |
| shared   | Umumiy infratuzilma — api client, ui-kit, hooks, helpers, constants, translations    |

## Domain (slice) ichki tuzilishi

Har bir domen quyidagi segmentlardan iborat bo'lishi mumkin:

```
entities/cargo/
  api/      → REST chaqiriqlar (cargo.api.ts)
  model/    → types.ts, store, selectors, business logic
  ui/       → faqat shu domenga tegishli kichik UI komponentlar
  lib/      → domen ichidagi pure helper funksiyalar
  index.ts  → barrel — public API (segmentlarni shu yerdan eksport qiling)
```

## Barrel export qoidasi

- Har bir slice/segment'da `index.ts` bo'ladi va faqat **public** narsalarni reeksport qiladi.
- Tashqaridan import qilganda `@/entities/cargo` ko'rinishida import qilinadi, ichki yo'l yozilmaydi.
- Public bo'lmagan fayllar `_internal/` papkasiga joylanadi (kelajakda kerak bo'lsa).
