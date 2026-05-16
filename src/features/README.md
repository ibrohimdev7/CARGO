# features/

Foydalanuvchi harakatlari (use-case'lar) qatlami. Har bir feature **bitta aniq harakat**ni inkapsulyatsiya qiladi.

## Misol

```
features/
  add-to-favorites/   → e'loni saqlash use-case
    api/              → favorite-toggle.api.ts (POST/DELETE)
    model/            → useFavoritesStore
    ui/               → FavoriteButton
    index.ts
  filter-cargo/       → katalogni filterlash use-case
  auth-login/         → kirish formasi va submit logikasi
```

## Qoidalar

1. Feature `entities/*` va `shared/*` dan import qiladi.
2. Feature **boshqa feature'dan import qilmaydi**. Cross-feature kompozitsiya `widgets/` darajasida bajariladi.
3. Feature alohida o'zining UI'ini boshqaradi (button, modal, form). Bu UI shared/ui ga ko'tarilmasligi kerak.
4. Mutation API'lari (POST/PUT/DELETE) ko'pincha feature ichida tursin. Read-only API entity'da.
