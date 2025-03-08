let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发工具配置
  // Development tools configuration
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks'], // 只在这些目录中运行 ESLint
  },
  typescript: {
    tsconfigPath: './tsconfig.json', // 使用自定义的 TypeScript 配置
  },

  // 图片优化配置
  // Image optimization configuration
  images: {
    domains: ['gowork.example.com'], // 允许的图片域名
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 响应式图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 图片尺寸
    formats: ['image/webp'], // 使用 WebP 格式
  },

  // 构建优化
  // Build optimization
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // 实验性功能
  // Experimental features
  experimental: {
    serverActions: true, // 启用服务器操作
    typedRoutes: true, // 启用类型安全的路由
  },

  // 安全配置
  // Security configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // 重定向配置
  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/search',
        destination: '/jobs',
        permanent: true,
      }
    ];
  },

  // 路由重写配置
  // Rewrite configuration
  async rewrites() {
    return {
      beforeFiles: [
        // API 路由重写
        {
          source: '/api/v1/:path*',
          destination: '/api/:path*',
        }
      ],
      afterFiles: [
        // 静态文件路由重写
        {
          source: '/assets/:path*',
          destination: '/public/assets/:path*',
        }
      ]
    };
  },

  // 环境变量配置
  // Environment variables configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // 输出配置
  // Output configuration
  output: 'standalone',

  // 性能优化
  // Performance optimization
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  reactStrictMode: true,
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
