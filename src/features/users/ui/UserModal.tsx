import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { useUserQuery } from "../hooks/useUsers";
import { Mail, Phone, Globe, MapPin, Building2 } from "lucide-react";

interface UserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ userId, isOpen, onClose }: UserModalProps) {
  const { data: user, isLoading } = useUserQuery(userId || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Foydalanuvchi ma'lumotlari</DialogTitle>
          <DialogDescription>
            Foydalanuvchi haqida to'liq ma'lumot
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <Badge variant="secondary" className="mt-2">
                  @{user.username}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">ID: {user.id}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>

              {user.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              )}

              {user.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              )}
            </div>

            {user.address && (
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium">Manzil</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {user.address.suite}, {user.address.street}
                  <br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            )}

            {user.company && (
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium">Kompaniya</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {user.company.name}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
