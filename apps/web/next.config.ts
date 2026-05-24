import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'],
}

export default config
