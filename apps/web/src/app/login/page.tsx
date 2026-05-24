'use client'

import { Form, Input, Button, Card, Typography } from 'antd'
import Link from 'next/link'

const { Title, Text } = Typography

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm shadow-sm">
        <Title level={3} className="!mb-6 text-center">
          Sign in
        </Title>
        <Form layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item className="!mb-2">
            <Button type="primary" htmlType="submit" size="large" block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary" className="text-center block text-sm">
          No account?{' '}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </Text>
      </Card>
    </main>
  )
}
