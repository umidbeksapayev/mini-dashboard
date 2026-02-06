import React from 'react'
import { User } from '@/entities/user/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface UsersTableProps {
  users: User[]
  onUserClick: (user: User) => void
}

/**
 * UsersTable - foydalanuvchilar jadvali
 * 
 * Performance optimization: React.memo ishlatilgan chunki:
 * - Jadval katta bo'lishi mumkin (100+ qator)
 * - Parent component har safar re-render bo'lganda jadval ham re-render bo'lmasligi uchun
 * - users va onUserClick props o'zgarmasa, re-render bo'lmaydi
 */
export const UsersTable = React.memo<UsersTableProps>(({ users, onUserClick }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ism</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Kompaniya</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              Foydalanuvchilar topilmadi
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user.username}</Badge>
              </TableCell>
              <TableCell>{user.company?.name || '-'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUserClick(user)}
                >
                  Ko'rish
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
})

UsersTable.displayName = 'UsersTable'
