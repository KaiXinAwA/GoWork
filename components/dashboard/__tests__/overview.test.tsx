import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Overview } from '../overview'
import { ThemeProvider } from '@/components/theme-provider'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}))

// 模拟数据
// Mock data
const mockData = [
  { name: "Jan", total: 12 },
  { name: "Feb", total: 15 },
]

// 模拟获取数据的API
// Mock data fetching API
const mockFetch = jest.fn()

describe('Overview Component', () => {
  // 每个测试前重置所有模拟
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = mockFetch
  })

  // 测试初始加载状态
  // Test initial loading state
  it('shows loading skeleton initially', () => {
    mockFetch.mockImplementationOnce(() => 
      new Promise((resolve) => {
        resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        })
      })
    )

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Overview />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  // 测试数据加载成功
  // Test successful data loading
  it('displays data after successful loading', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    )

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Overview />
      </ThemeProvider>
    )

    // 等待加载完成
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument()
    })

    // 等待图表渲染完成
    // Wait for chart to render
    await waitFor(() => {
      const chartContainer = document.querySelector('.recharts-responsive-container')
      expect(chartContainer).toBeInTheDocument()
    })
  })

  // 测试错误处理
  // Test error handling
  it('shows error message when data loading fails', async () => {
    // 模拟API调用失败
    // Mock API call failure
    mockFetch.mockImplementationOnce(() => 
      Promise.reject(new Error('Failed to fetch'))
    )

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Overview />
      </ThemeProvider>
    )

    // 等待错误信息显示
    // Wait for error message to display
    await waitFor(() => {
      expect(screen.getByText('Failed to load chart data')).toBeInTheDocument()
    })
  })

  // 测试响应式布局
  // Test responsive layout
  it('maintains responsive container dimensions', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    )

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Overview />
      </ThemeProvider>
    )

    // 等待图表容器渲染完成
    // Wait for chart container to render
    await waitFor(() => {
      const container = document.querySelector('.recharts-responsive-container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveStyle({ width: '100%', height: '350px' })
    })
  })
})