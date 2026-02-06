import { ProfileForm } from '@/features/settings/ui/ProfileForm'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sozlamalar</h1>
        <p className="text-muted-foreground">Profil va hisob sozlamalari</p>
      </div>

      <ProfileForm />
    </div>
  )
}
