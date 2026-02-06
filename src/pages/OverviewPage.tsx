import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Users, Activity, TrendingUp, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Fake data for chart
const chartData = [
  { name: 'Yan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Iyun', value: 900 },
]

const stats = [
  {
    title: 'Jami foydalanuvchilar',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
  },
  {
    title: 'Faol sessiyalar',
    value: '1,234',
    change: '+5.2%',
    icon: Activity,
  },
  {
    title: 'O\'sish',
    value: '+23.8%',
    change: '+2.1%',
    icon: TrendingUp,
  },
  {
    title: 'Daromad',
    value: '$12,345',
    change: '+8.3%',
    icon: DollarSign,
  },
]

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-muted-foreground">Dashboard statistikasi va ma'lumotlar</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> o'tgan oyga nisbatan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Oylik statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
