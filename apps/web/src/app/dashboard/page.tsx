'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography, Avatar } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../store'
import { clearAuth } from '../../store/auth.slice'

const { Text } = Typography

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { accessToken, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!accessToken) router.replace('/login')
  }, [accessToken, router])

  if (!accessToken) return null

  const handleLogout = () => {
    dispatch(clearAuth())
    router.push('/login')
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
        <Text strong className="text-purple-600">
          SaaS App
        </Text>

        <div className="flex items-center gap-3">
          <Avatar
            size={32}
            className="bg-purple-600 text-white text-sm font-semibold select-none"
          >
            {initials}
          </Avatar>
          <Text className="text-gray-700">{user?.name}</Text>
          <Button icon={<LogoutOutlined />} size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-8">
        <Text type="secondary">{user?.email}</Text>
      </div>
    </main>
  )
}
