# shared/

Loyihaning umumiy infratuzilmasi. Bu qatlam **hech qaysi qatlamga** bog'liq bo'lmasligi kerak — toza, qayta ishlatiladigan kod.

## Tuzilish

```
shared/
  api/           → BaseService, withServerApi wrapper, FetchError, common types
  config/        → constants, env config, public konstanta'lar
  lib/           → cn (clsx + tw-merge), formatters, date utils, pure helpers
  model/         → cross-domain primitive types (Pagination, ResData wrapper)
  store/         → Zustand global storage (theme, ui state)
  translations/  → next-intl message JSON fayllar (locales/{uz,ru,en}.json)
  ui/            → ui-kit base komponentlar (Button, Input, Dialog, Select, Skeleton)
```

## Qoidalar

1. Hech qachon `entities/`, `features/`, `widgets/`, `app/` dan import qilmaydi.
2. Komponentlar **stylesiz emas, lekin business logikasiz**. Faqat tashqi props/variantlarga reaksiya beradi.
3. API client (BaseService) "transport" darajasi — domain ma'lumotlarini bilmaydi.
4. Har bir segment'ning `index.ts` barreli bor.
