# widgets/

Sahifa darajasidagi katta, mustaqil bloklar. Widget bir nechta feature/entity'ni birlashtirib, to'liq UI bo'lagini taqdim etadi.

## Misol

```
widgets/
  navbar/         → top navigation (logo + lang switcher + auth feature)
  footer/         → quyi maydon
  cargo-card/     → katalogdagi yuk kartochkasi (entity ui + favorite feature)
  cargo-filter/   → filtrlar paneli (filter feature + form UI)
  pagination/
  gallery/
```

## Qoidalar

1. Widget `features/`, `entities/` va `shared/` dan import qiladi.
2. Widget **boshqa widget'dan import qilmaydi**. Sahifadagi kompozitsiya `app/` darajasida.
3. Widget ichida marshrutga oid logika **yo'q** — bu app qatlamining vazifasi.
4. Widget hodisalar va props orqali tashqi dunyo bilan muloqot qiladi.
