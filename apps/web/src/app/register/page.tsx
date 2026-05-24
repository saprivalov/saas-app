'use client'

import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../api/auth.api'
import { setCredentials } from '../../store/auth.slice'
import type { AppDispatch } from '../../store'

const { Title, Text } = Typography

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [register, { isLoading, error }] = useRegisterMutation()

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    const result = await register(values)
    if ('data' in result && result.data) {
      dispatch(setCredentials(result.data.data))
      router.push('/dashboard')
    }
  }

  const errorMessage =
    error && 'status' in error
      ? ((error.data as { error?: string })?.error ?? 'Registration failed')
      : null

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm shadow-sm">
        <Title level={3} className="!mb-6 text-center">
          Create account
        </Title>

        {errorMessage && (
          <Alert type="error" message={errorMessage} className="mb-4" showIcon />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]}>
            <Input placeholder="John Doe" size="large" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 8, message: 'At least 8 characters' }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item className="!mb-2">
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              Create account
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary" className="text-center block text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600">
            Sign in
          </Link>
        </Text>
      </Card>
    </main>
  )
}
