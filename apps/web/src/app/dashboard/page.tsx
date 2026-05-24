'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography, Card, Avatar } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../store'
import { clearAuth } from '../../store/auth.slice'

const { Title, Text } = Typography

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

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
        <Text strong className="text-purple-600">
          SaaS App
        </Text>
        <Button icon={<LogoutOutlined />} size="small" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-8">
        <Card>
          <div className="flex items-center gap-4">
            <Avatar size={56} icon={<UserOutlined />} className="bg-purple-100 text-purple-700" />
            <div>
              <Title level={4} className="!mb-0">
                {user?.name ?? 'Welcome'}
              </Title>
              <Text type="secondary">{user?.email}</Text>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
