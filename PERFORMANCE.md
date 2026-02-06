# ⚡ Performance Optimization Guide

Bu loyihada qo'llangan barcha performance optimization'lar va ularning sabablari.

## 🎯 Optimizatsiya Strategiyasi

**Qoida:** Avval ishlaydigan kod yoz, keyin optimize qil.

Bu loyihada faqat **zarur joylarda** optimizatsiya qilingan:
- UsersTable (katta data set, tez-tez re-render)
- Callback functions (child component props)
- Columns definition (har render'da yangi array yaratmaslik)

## 1️⃣ React.memo - UsersTable

### 📍 Location
`src/features/users/ui/UsersTable.tsx`

### 💡 Sabab
```typescript
function UsersPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Har search query o'zgarganda UsersPage re-render bo'ladi
  // Agar UsersTable memo qilinmasa, u ham re-render bo'ladi
  // Lekin users data o'zgarmagan!
  
  return <UsersTable users={users} />
}
```

### ✅ Solution
```typescript
export const UsersTable = React.memo(function UsersTable({ users, onUserClick }) {
  // Endi faqat users yoki onUserClick o'zgarganda re-render
})
```

### 📊 Ta'sir
- Search input'ga yozganda: UsersTable re-render **SKIP**
- Page state o'zgarganda: UsersTable re-render **SKIP**
- users data kelganda: UsersTable re-render **HAPPENS**

### ⚠️ Caveat
Agar onUserClick har render'da yangi function bo'lsa, memo ishlamaydi:
```typescript
// ❌ Bad: Har render'da yangi function
<UsersTable onUserClick={(id) => setSelected(id)} />

// ✅ Good: useCallback bilan
<UsersTable onUserClick={handleUserClick} />
```

## 2️⃣ useCallback - Event Handlers

### 📍 Location
`src/pages/UsersPage.tsx`

### 💡 Sabab
```typescript
// Har render'da yangi function yaratiladi
const handleUserClick = (userId) => {
  setSelectedUserId(userId)
}
// handleUserClick !== handleUserClick (keyingi render'da)
```

### ✅ Solution
```typescript
const handleUserClick = useCallback((userId: number) => {
  setSelectedUserId(userId)
}, [])  // Dependencies: bo'sh = function hech qachon o'zgarmaydi
```

### 📊 Ta'sir
```typescript
// 1st render
const fn1 = useCallback(..., [])

// 2nd render (search changed)
const fn2 = useCallback(..., [])

// fn1 === fn2 ✅ (same reference)
```

Bu UsersTable memo'ning ishlashini ta'minlaydi.

### 🤔 Qachon useCallback kerak?

**Kerak:**
- Memo'langan component'ga prop sifatida uzatilganda
- useEffect/useMemo dependency sifatida ishlatilganda
- Custom hook'dan qaytarilganda

**Kerak emas:**
- Oddiy event handler (inline onClick)
- Parent component memo qilinmagan bo'lsa
- Optimization muammo yaratayotgan bo'lsa

## 3️⃣ useMemo - Columns Definition

### 📍 Location
`src/features/users/ui/UsersTable.tsx`

### 💡 Sabab
```typescript
// ❌ Har render'da yangi array
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
]
```

### ✅ Solution
```typescript
const columns = useMemo(
  () => [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ],
  []  // Bir marta hisoblandi, cached
)
```

### 📊 Ta'sir
Kichik, lekin:
- Garbage collection pressure kamayadi
- Array yaratish overhead yo'q
- Consistent reference (agar dependency bo'lsa)

### 🤔 Qachon useMemo kerak?

**Kerak:**
- Qimmat hisoblashlar (filtering, sorting large arrays)
- Dependency sifatida ishlatilganda
- React.memo comparison'da ishtirok etganda

**Kerak emas:**
- Oddiy primitive values
- Kichik arraylar/objectlar
- Har safar yangi value kerak bo'lganda

## 4️⃣ React Query Optimizations

### 📍 Location
`src/shared/providers/QueryProvider.tsx`

### ✅ Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,           // 30s - fresh data hisoblanadi
      gcTime: 5 * 60 * 1000,      // 5min - cache'da saqlanadi
      retry: 1,                   // Faqat 1 marta retry
      refetchOnWindowFocus: false, // Windowga qaytganda refetch qilmaydi
    },
  },
})
```

### 📊 Ta'sir
- **staleTime**: Tez-tez API call'lar kamayadi
- **gcTime**: Eski data'ni optimal vaqtda tozalaydi
- **refetchOnWindowFocus**: Zararsiz refetch'larni oldini oladi

## 5️⃣ Debounce Hook

### 📍 Location
`src/shared/hooks/useDebounce.ts`

### 💡 Sabab
```typescript
// User "John" deb yozadi
// J → API call
// Jo → API call
// Joh → API call
// John → API call
// = 4 ta API call!
```

### ✅ Solution
```typescript
const debouncedSearch = useDebounce(searchQuery, 400)

// User yozishni to'xtatgandan 400ms keyin 1 ta API call
```

### 📊 Ta'sir
- API calls 75-90% kamayadi
- Server load kamayadi
- Tezroq UI response

## 📈 Optimization Hierarchy

```
1. Kod to'g'ri ishlaydi ✅
2. Profiler bilan o'lchash
3. Bottleneck topish
4. Optimize qilish
5. Qayta o'lchash
```

## 🚫 Over-Optimization Examples

### ❌ Keraksiz memo
```typescript
// Kichik, oddiy component
const SmallButton = React.memo(({ label }) => (
  <button>{label}</button>
))
// Memo overhead > Re-render cost
```

### ❌ Keraksiz useCallback
```typescript
// Component memo qilinmagan
function Page() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])
  
  return <NotMemoedChild onClick={handleClick} />
  // useCallback foydasiz, chunki NotMemoedChild har safar render bo'ladi
}
```

### ❌ Keraksiz useMemo
```typescript
// Oddiy hisoblash
const total = useMemo(() => a + b, [a, b])
// useMemo overhead > Addition cost
```

## ✅ Real Optimization Checklist

1. **Code splitting** (React.lazy)
   - Large pages/features
   - Conditional features

2. **Image optimization**
   - Lazy loading
   - WebP format
   - Proper sizing

3. **Bundle size**
   - Tree shaking
   - Dependency audit
   - Code splitting

4. **Network**
   - Caching strategy
   - Compression (gzip/brotli)
   - CDN usage

5. **Rendering**
   - Virtual scrolling (large lists)
   - Pagination
   - Lazy loading

## 🎯 Optimization Xulosa

### Bu loyihada:
✅ UsersTable memo - **Zarur** (katta data, tez re-render)
✅ useCallback - **Zarur** (memo'langan child'ga prop)
✅ useMemo (columns) - **Yaxshi practice** (kichik overhead)
✅ Debounce - **Zarur** (API calls kamayishi)
✅ React Query config - **Zarur** (network optimization)

### Umumiy qoida:
1. **Measure first** - React DevTools Profiler
2. **Optimize real bottlenecks** - Fake muammolarni emas
3. **Keep code simple** - Optimization complexity qo'shadi
4. **Document why** - Keyingi developer tushunishi uchun

---

**Eslab qoling:** Premature optimization is the root of all evil. Lekin strategic optimization smart engineering'dir! 🚀
