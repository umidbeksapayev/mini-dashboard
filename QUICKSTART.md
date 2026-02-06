# 🚀 Quick Start Guide

## Install va Run

```bash
# 1. Loyiha papkasiga o'tish
cd mini-dashboard

# 2. Dependencies o'rnatish (npm, yarn, yoki pnpm)
npm install
# yoki
yarn install
# yoki
pnpm install

# 3. Development server
npm run dev
# Server: http://localhost:5173

# 4. Browser ochib, login qiling
# Email: demo@example.com
# Password: demo123
```

## 📋 Sahifalar

1. **Login** (`/login`)
   - Email/password validation
   - Auto-redirect after login

2. **Overview** (`/`)
   - Stat cards
   - Dashboard summary

3. **Users** (`/users`)
   - Search (debounced)
   - Pagination
   - User detail modal

4. **Settings** (`/settings`)
   - Profile update form

## 🎯 Key Features to Test

1. **Login Flow**
   - Login qiling
   - localStorage'da token tekshiring
   - Logout qiling

2. **Protected Routes**
   - Logout holatida `/users` ga boring → `/login` ga redirect

3. **Search & Pagination**
   - Users sahifasida qidiruv
   - Pagination tugmalarini sinab ko'ring

4. **Modal**
   - User ustiga "Ko'rish" tugmasini bosing
   - Detail ma'lumotlar ko'rinadi

5. **Form Validation**
   - Login formada noto'g'ri email kiriting
   - Settings'da bo'sh form submit qiling

## 🔧 Customization

### API'ni o'zgartirish

`src/shared/api/axiosInstance.ts`:
```typescript
baseURL: 'https://your-api.com/api'
```

### Theme o'zgartirish

`tailwind.config.js` da color palette'ni o'zgartiring

### Yangi sahifa qo'shish

1. Page component yarating: `src/pages/NewPage.tsx`
2. Router'ga qo'shing: `src/app/router.tsx`
3. Sidebar'ga link qo'shing: `src/widgets/Sidebar.tsx`

## 📦 Build

```bash
# Production build
npm run build

# Build natijasini ko'rish
npm run preview
```

## 🐛 Troubleshooting

**Port busy?**
```bash
# vite.config.ts
export default defineConfig({
  server: { port: 3000 }
})
```

**Path alias ishlamayapti?**
- `tsconfig.json` va `vite.config.ts` da `@` alias borligini tekshiring

**Styles yuklanmayapti?**
```bash
# Tailwind'ni qayta build qilish
npm run dev
```
