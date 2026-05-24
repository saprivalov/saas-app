import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StoreProvider } from '../components/StoreProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'SaaS App',
  description: 'Built with AI agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  )
}
