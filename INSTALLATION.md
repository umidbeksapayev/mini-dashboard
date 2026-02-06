# 📦 Installation Guide

Bu loyihani ishga tushirish uchun batafsil qo'llanma.

## Prerequisites

Kompyuteringizda quyidagilar o'rnatilgan bo'lishi kerak:

- **Node.js**: v18.0.0 yoki yuqori
- **npm**: v9.0.0 yoki yuqori (Node.js bilan birga keladi)

### Node.js tekshirish

```bash
node --version  # v18.0.0 yoki yuqori bo'lishi kerak
npm --version   # v9.0.0 yoki yuqori bo'lishi kerak
```

Agar o'rnatilmagan bo'lsa: [nodejs.org](https://nodejs.org/) dan yuklab oling.

## Step 1: Loyihani ochish

```bash
cd mini-dashboard
```

## Step 2: Dependencies o'rnatish

```bash
npm install
```

Bu jarayon 1-2 daqiqa davom etishi mumkin. 40+ paket o'rnatiladi (~200MB).

### O'rnatish jarayoni muvaffaqiyatli bo'lganligini tekshirish

```bash
ls node_modules  # Ko'plab paketlar ko'rinishi kerak
```

## Step 3: Development server

```bash
npm run dev
```

Terminal'da quyidagicha ko'rinishi kerak:

```
  VITE v5.0.10  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Step 4: Browser'da ochish

Brauzeringizda `http://localhost:5173` ni oching.

Login sahifasini ko'rishingiz kerak.

## Step 5: Login

Har qanday email va parol bilan kirish mumkin:

```
Email: test@example.com
Parol: 123
```

## Troubleshooting

### Problem: Port allaqachon band

```bash
# Boshqa port ishlatish
npm run dev -- --port 3000
```

### Problem: Dependencies o'rnatishda xatolik

```bash
# Cache'ni tozalash va qayta o'rnatish
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problem: TypeScript xatoliklari

```bash
# TypeScript'ni qayta build qilish
npm run build
```

### Problem: Tailwind CSS ishlamayapti

```bash
# Tailwind config'ni tekshiring
npx tailwindcss init --check
```

## Environment Variables (Ixtiyoriy)

Environment variables ishlatish uchun:

```bash
# .env.example'dan nusxa olish
cp .env.example .env

# .env faylni tahrirlash
# VITE_API_BASE_URL va boshqa o'zgaruvchilarni o'zgartiring
```

## Development Tools

### React Query DevTools

Browser'da dashboard'ni ochganingizda, pastki o'ng burchakda React Query DevTools ikonkasi ko'rinadi.

### VSCode Extensions (Tavsiya)

Agar VSCode ishlatayotgan bo'lsangiz:

1. `Cmd/Ctrl + Shift + X` - Extensions oynasini oching
2. Loyihani ochganingizda VSCode recommended extensions'ni o'rnatishni taklif qiladi
3. "Install All" tugmasini bosing

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- ES7 React Snippets

## Build uchun

Production build yaratish:

```bash
npm run build
```

Build files `dist/` papkasida paydo bo'ladi.

Preview qilish:

```bash
npm run preview
```

## Keyingi qadamlar

1. ✅ README.md'ni o'qing
2. ✅ QUICKSTART.md'dan boshlang
3. ✅ PROJECT_SUMMARY.md'da arxitektura haqida o'rganing
4. ✅ Kodda `src/features/` dan boshlang

## Yordam kerakmi?

- README.md - To'liq documentation
- QUICKSTART.md - 5 daqiqalik qo'llanma
- PROJECT_SUMMARY.md - Loyiha haqida umumiy ma'lumot
- Har bir fayl ichida code comments mavjud

**Good luck! 🚀**
