# 🏗️ Architecture Overview

## Feature-Based Structure (FSD-inspired)

Loyiha feature-based architecture bilan tuzilgan - bu modulyar, scalable, va maintainable kod bazasi yaratish uchun zamonaviy yondashuv.

## 📐 Layer Hierarchy

```
┌─────────────────────────────────────┐
│           app/                      │  ← Application initialization
├─────────────────────────────────────┤
│           pages/                    │  ← Full page components
├─────────────────────────────────────┤
│           widgets/                  │  ← Complex UI blocks
├─────────────────────────────────────┤
│           features/                 │  ← User interactions
├─────────────────────────────────────┤
│           entities/                 │  ← Business entities
├─────────────────────────────────────┤
│           shared/                   │  ← Shared utilities
└─────────────────────────────────────┘
```

## 📂 Detailed Structure

### `app/` - Application Layer
```
app/
├── main.tsx          # Entry point
├── App.tsx           # Root component
└── router.tsx        # Route configuration
```
**Responsibility**: Bootstrap application, setup global providers

### `pages/` - Page Layer
```
pages/
├── AuthPage.tsx      # Login page
├── OverviewPage.tsx  # Dashboard overview
├── UsersPage.tsx     # Users management
└── SettingsPage.tsx  # Settings page
```
**Responsibility**: Compose features into complete pages

### `widgets/` - Widget Layer
```
widgets/
├── Sidebar.tsx       # Navigation sidebar
├── Topbar.tsx        # Header with user menu
└── DashboardLayout.tsx  # Main layout wrapper
```
**Responsibility**: Complex, reusable UI blocks

### `features/` - Feature Layer
```
features/
├── auth/
│   ├── model/authStore.ts      # State management
│   ├── api/authApi.ts          # API calls
│   └── ui/LoginForm.tsx        # UI components
├── users/
│   ├── api/usersApi.ts
│   ├── hooks/useUsersQuery.ts  # Custom hooks
│   └── ui/
│       ├── UsersTable.tsx
│       └── UserModal.tsx
└── settings/
    ├── api/settingsApi.ts
    └── ui/ProfileForm.tsx
```
**Responsibility**: User-facing functionality (auth, CRUD operations)

**Feature structure:**
- `model/` - State, types, business logic
- `api/` - API integration
- `hooks/` - Custom React hooks
- `ui/` - Feature-specific UI components

### `entities/` - Entity Layer
```
entities/
└── user/
    └── model/
        └── types.ts    # User type definitions
```
**Responsibility**: Core business entities and their types

### `shared/` - Shared Layer
```
shared/
├── api/
│   ├── axiosInstance.ts    # Configured Axios
│   └── endpoints.ts        # API endpoints
├── hooks/
│   ├── useDebounce.ts
│   └── useAuth.ts
├── lib/
│   └── utils.ts            # Helper functions
├── providers/
│   ├── QueryProvider.tsx
│   └── AuthGuard.tsx
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...                 # shadcn/ui components
```
**Responsibility**: Reusable utilities, components, and infrastructure

## 🔄 Data Flow

```
User Action → Feature (UI) → API Layer → Backend
                ↓
            React Query
                ↓
            Cache/State
                ↓
            UI Update
```

### Example: User Search Flow

```typescript
// 1. User yozadi (UsersPage)
setSearchQuery('john')

// 2. Debounce hook (400ms)
const debouncedSearch = useDebounce(searchQuery, 400)

// 3. React Query auto-fetch
const { data } = useUsersQuery({ q: debouncedSearch })

// 4. API request
getUsersApi({ q: 'john' }) → Axios → JSONPlaceholder

// 5. Cache & render
React Query caches → UsersTable renders
```

## 🎯 Design Patterns

### 1. Separation of Concerns

**UI ≠ Logic ≠ Data**
```typescript
// ✅ Good: Separated
features/users/
├── api/usersApi.ts          # Data fetching
├── hooks/useUsersQuery.ts   # React Query logic
└── ui/UsersTable.tsx        # Presentation only

// ❌ Bad: Mixed
UsersPage.tsx  // Everything in one file
```

### 2. Custom Hooks Pattern

```typescript
// Hook encapsulates complex logic
function useUsersQuery(params) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersApi(params),
    staleTime: 30000,
  })
}

// Component stays clean
function UsersPage() {
  const { data } = useUsersQuery({ page: 1 })
}
```

### 3. Dependency Rule

**Higher layers can import from lower layers, NOT vice versa**

```typescript
// ✅ Good
pages/UsersPage.tsx → imports → features/users/ui/UsersTable.tsx

// ❌ Bad
features/users/ui/UsersTable.tsx → imports → pages/UsersPage.tsx
```

### 4. Feature Isolation

Har bir feature o'z-o'ziga yetarli (self-contained):

```
features/auth/     # Can work independently
features/users/    # Can work independently
features/settings/ # Can work independently
```

## 🔐 State Management Strategy

### Local vs Global State

**Local State (useState):**
- UI state (modals, dropdowns, form inputs)
- Page-specific state (search query, pagination)

**Global State (Zustand):**
- Auth state (user, token)
- Theme preferences (if needed)

**Server State (React Query):**
- Users data
- API responses
- Cache management

```typescript
// Component state distribution
function UsersPage() {
  const [page, setPage] = useState(1)              // Local: pagination
  const [search, setSearch] = useState('')         // Local: search
  const { data } = useUsersQuery({ page, search }) // Server: users data
  const { user } = useAuth()                       // Global: current user
}
```

## 🚀 Performance Optimization Points

### 1. React.memo Location
```typescript
// UsersTable.tsx - memo prevents re-render when parent search state changes
export const UsersTable = React.memo(function UsersTable({ users, onUserClick }) {
  // Only re-renders when users or onUserClick changes
})
```

### 2. useCallback Location
```typescript
// UsersPage.tsx - stable reference for memo'ed child
const handleUserClick = useCallback((userId) => {
  setSelectedUserId(userId)
}, [])  // Empty deps = function never changes
```

### 3. useMemo Location
```typescript
// UsersTable.tsx - columns definition cached
const columns = useMemo(() => [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' }
], [])  // Computed once
```

## 📊 Why This Structure?

### Scalability
- Easy to add new features
- Features don't interfere with each other
- Clear ownership of code

### Maintainability
- Find code easily (feature-based grouping)
- Update one feature without touching others
- Clear boundaries

### Testability
- Each layer can be tested independently
- Mock dependencies easily
- Feature-level integration tests

### Team Collaboration
- Multiple developers can work on different features
- Less merge conflicts
- Clear code ownership

## 🎓 Learning Path

1. **Start from shared/** - Understand utilities
2. **Move to entities/** - Learn domain types
3. **Explore features/** - See how features work
4. **Check widgets/** - Complex UI patterns
5. **Review pages/** - How everything comes together
6. **Study app/** - Application bootstrap

---

Bu architecture real-world production loyihalar uchun proven pattern. Feature-based structure kod bazasini organized va scalable qiladi.
