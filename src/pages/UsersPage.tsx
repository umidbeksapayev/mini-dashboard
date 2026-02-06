import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUsersQuery } from '@/features/users/hooks/useUsers'
import { UsersTable } from '@/features/users/ui/UsersTable'
import { UserModal } from '@/features/users/ui/UserModal'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { User } from '@/entities/user/types'

export function UsersPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounce search query (400ms)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // Fetch users with React Query
  const { data, isLoading, error } = useUsersQuery({
    page,
    limit: 10,
    q: debouncedSearch,
  })

  // Calculate total pages
  /**
   * useMemo - total pages'ni har safar qayta hisoblashdan saqlaydi
   * Faqat data.total yoki data.limit o'zgarganda qayta hisoblanadi
   */
  const totalPages = useMemo(() => {
    if (!data) return 0
    return Math.ceil(data.total / data.limit)
  }, [data])

  /**
   * useCallback - handleUserClick funksiyasini memorize qiladi
   * Bu UsersTable componentiga prop sifatida uzatilganligi uchun muhim
   * Aks holda har render'da yangi funksiya yaratiladi va UsersTable re-render bo'ladi
   */
  const handleUserClick = useCallback((user: User) => {
    setSelectedUserId(user.id)
    setIsModalOpen(true)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1) // Reset page on search
  }

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Foydalanuvchilar</h1>
        <p className="text-muted-foreground">Barcha foydalanuvchilar ro'yxati</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Qidiruv</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ism, email yoki username bo'yicha qidiring..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Foydalanuvchilar jadvali</CardTitle>
            {data && (
              <p className="text-sm text-muted-foreground">
                Jami: {data.total} ta
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error ? (
            <div className="text-center text-destructive">
              Xatolik yuz berdi: {error.message}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              <UsersTable users={data.data} onUserClick={handleUserClick} />

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Sahifa {page} / {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Oldingi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                    >
                      Keyingi
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              Foydalanuvchilar topilmadi
            </div>
          )}
        </CardContent>
      </Card>

      <UserModal
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
