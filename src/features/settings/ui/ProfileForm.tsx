import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { settingsApi } from '../api/settingsApi'
import { useAuthStore } from '@/features/auth/model/authStore'

const profileSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  email: z.string().email('Email noto\'g\'ri formatda'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm() {
  const user = useAuthStore((state) => state.user)
  const login = useAuthStore((state) => state.login)
  const token = useAuthStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      const updatedUser = await settingsApi.updateProfile(data)
      
      // Store'ni yangilash (tokenni saqlab qolamiz)
      if (token) {
        login(token, updatedUser)
      }

      setSuccess(true)
      
      // 3 soniyadan keyin success message'ni yashirish
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Profil sozlamalari</CardTitle>
        <CardDescription>
          Shaxsiy ma'lumotlaringizni yangilang
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ism</Label>
            <Input
              id="name"
              placeholder="Ismingiz"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-500/15 p-3">
              <p className="text-sm text-green-600">Ma'lumotlar muvaffaqiyatli yangilandi!</p>
            </div>
          )}

          <Button type="submit" disabled={isLoading || !isDirty}>
            {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
