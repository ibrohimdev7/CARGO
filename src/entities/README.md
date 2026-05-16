# entities/

Biznes domain'larining qatlami. Har bir domen mustaqil ravishda rivojlanadi va boshqa entity'larni **import qilmaydi**.

## Misol

```
entities/
  cargo/          → yuk e'lonlari domen
    api/          → cargoList, cargoDetail, cargoFilter
    model/        → CargoType, CargoStatus
    ui/           → CargoInfo, CargoStatusBadge
    lib/          → formatCargoWeight
    index.ts
  profile/        → foydalanuvchi domen
  order/          → buyurtma domen
```

## Qoidalar

1. Entity boshqa entity'dan **import qilmaydi**. Agar kerak bo'lsa, umumiy modelni `shared` ga ko'chir.
2. Faqat `shared/*` dan import qilish mumkin.
3. Har bir entity `index.ts` barrelidan public API'sini eksport qiladi.
4. Domain ichida konkret feature mantig'i bo'lmasligi kerak — u `features/` qatlamida.
