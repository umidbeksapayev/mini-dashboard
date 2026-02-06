# Mini Dashboard - React + TypeScript + Vite

Production-ready Mini Dashboard loyihasi, zamonaviy frontend stack bilan qurilgan.

## 🚀 Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Zustand (auth state)
- **Data Fetching**: TanStack React Query + Axios
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

## 📁 Arxitektura

Loyiha feature-based arxitektura asosida tuzilgan:

```
src/
├── app/                    # App konfiguratsiyasi (router, providers)
├── pages/                  # Sahifalar (OverviewPage, UsersPage, etc.)
├── widgets/                # Katta komponentlar (Layout, Sidebar, Topbar)
├── features/               # Feature-based modullar
│   ├── auth/              # Autentifikatsiya
│   ├── users/             # Foydalanuvchilar
│   └── settings/          # Sozlamalar
├── entities/              # Domain entities va types
├── shared/                # Umumiy komponentlar va utilities
│   ├── ui/               # shadcn/ui komponentlari
│   ├── api/              # API layer (axios)
│   ├── hooks/            # Custom hooks
│   └── providers/        # React providers
```

## 🎯 Features

### ✅ Autentifikatsiya
- Login form (Zod validation bilan)
- Zustand store (localStorage persistence)
- Axios interceptors (auto token injection)
- Protected routes
- Auto logout on 401 error

### ✅ Foydalanuvchilar
- Search (debounced 400ms)
- Pagination
- Table view
- User detail modal
- React Query caching

### ✅ Sozlamalar
- Profile update form
- Form validation

### ✅ Dashboard
- Stat cards
- Interactive chart (Recharts)
- Responsive layout

## 🛠 Installation

```bash
# Dependencies o'rnatish
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔑 Login

Demo uchun **har qanday** email va parol ishlatishingiz mumkin:

```
Email: test@example.com
Parol: password
```

## 🎨 Komponentlar

Loyihada shadcn/ui kutubxonasidan foydalanilgan:
- Button
- Card
- Input
- Label
- Table
- Dialog (Modal)
- Dropdown Menu
- Avatar
- Badge
- Skeleton
- Select

## 🚦 Routes

- `/login` - Login sahifasi
- `/` - Dashboard overview
- `/users` - Foydalanuvchilar jadvali
- `/settings` - Profil sozlamalari

## ⚡ Performance Optimizations

### React.memo
`UsersTable` komponentida ishlatilgan:
```typescript
export const UsersTable = React.memo<UsersTableProps>(({ users, onUserClick }) => {
  // ...
})
```
**Sabab**: Jadval katta bo'lishi mumkin va parent component har safar re-render bo'lganda jadval ham re-render bo'lmasligi uchun.

### useMemo
`UsersPage`'da totalPages hisoblanishida:
```typescript
const totalPages = useMemo(() => {
  if (!data) return 0
  return Math.ceil(data.total / data.limit)
}, [data])
```
**Sabab**: Har render'da qayta hisoblashdan saqlash.

### useCallback
`handleUserClick` funksiyasida:
```typescript
const handleUserClick = useCallback((user: User) => {
  setSelectedUserId(user.id)
  setIsModalOpen(true)
}, [])
```
**Sabab**: UsersTable'ga prop sifatida uzatilgani uchun, yangi funksiya yaratilmasligi kerak.

## 🔐 Auth Flow

1. Login form'da email/password kiritiladi
2. Validation (Zod) o'tadi
3. API'ga so'rov yuboriladi (fake implementation)
4. Token va user ma'lumotlari qaytadi
5. Zustand store'ga va localStorage'ga saqlanadi
6. Dashboard'ga redirect bo'ladi
7. Axios interceptor har requestga token qo'shadi
8. 401 error bo'lsa, auto logout

## 📊 Data Fetching

React Query ishlatilgan:
```typescript
const { data, isLoading, error } = useUsersQuery({
  page,
  limit: 10,
  q: debouncedSearch,
})
```

**Afzalliklari**:
- Automatic caching (30s staleTime)
- Loading/error states
- Background refetching
- Query invalidation

## 🔄 API Layer

Axios instance bilan:
```typescript
// Request interceptor - token qo'shadi
axiosInstance.interceptors.request.use(...)

// Response interceptor - 401'da logout qiladi
axiosInstance.interceptors.response.use(...)
```

## 🎓 Alternative: RTK yoki Zustand?

**Zustand** ishlatilgan chunki:
- ✅ Lightweight (1kb)
- ✅ Simple API
- ✅ TypeScript support
- ✅ No boilerplate

**RTK (Redux Toolkit)** ham yaxshi variant:
- ✅ Redux DevTools
- ✅ Middleware support
- ✅ Larger ecosystem

Kichik loyihalarda **Zustand**, kattaroqlarida **RTK** tavsiya qilinadi.

## 📝 TypeScript

Loyihada `any` ishlatilmagan, barcha type'lar to'g'ri yozilgan:
```typescript
interface User {
  id: number
  name: string
  email: string
  // ...
}
```

## 🎉 Production Ready

Loyiha production'da ishlatishga tayyor:
- ✅ TypeScript strict mode
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Accessibility (shadcn/ui)
- ✅ Clean architecture
- ✅ Performance optimizations

## 📞 Support

Agar savol bo'lsa, README'ni o'qing yoki kodni ko'rib chiqing. Har bir file'da izohlar mavjud.

**Happy coding! 🚀**
