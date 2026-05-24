import Link from 'next/link'
import { Button } from 'antd'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
      <h1 className="text-5xl font-bold text-gray-900">SaaS App</h1>
      <p className="text-xl text-gray-500">Your product description goes here</p>
      <div className="flex gap-3">
        <Link href="/login">
          <Button type="primary" size="large">
            Get started
          </Button>
        </Link>
        <Link href="/login">
          <Button size="large">Sign in</Button>
        </Link>
      </div>
    </main>
  )
}
