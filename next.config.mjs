let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
    emotion: true,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  basePath: '',
  async headers() {
    // 获取允许的域名
    const allowedOrigins = process.env.NODE_ENV !== 'production' 
      ? ['http://localhost:3000', 'http://localhost:3001'] 
      : ['https://gowork.example.com', 'https://www.gowork.example.com'];
    
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: allowedOrigins.join(',') },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?!localhost).*',
            },
          ],
          destination: '/:path*',
        },
      ],
    }
  },
  // 移除冲突的 middleware 配置
  // async middleware() {
  //   return {
  //     headers: [
  //       {
  //         source: '/:path*',
  //         headers: [
  //           { key: 'Access-Control-Allow-Origin', value: '*' },
  //         ],
  //       },
  //     ],
  //   }
  // },
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
