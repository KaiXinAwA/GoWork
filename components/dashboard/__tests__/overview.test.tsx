import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Overview } from '../overview'
import { ThemeProvider } from '@/components/theme-provider'

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('Overview Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('显示加载状态 | shows loading state', () => {
    render(
      <ThemeProvider>
        <Overview />
      </ThemeProvider>
    )

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('显示图表数据 | displays chart data', async () => {
    const mockData = [
      { name: 'January', applications: 30, jobPosts: 15 },
      { name: 'February', applications: 40, jobPosts: 20 }
    ]

    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    })
    global.fetch = mockFetch

    render(
      <ThemeProvider>
        <Overview />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument()
    })

    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('February')).toBeInTheDocument()
  })

  it('处理错误情况 | shows error message when data loading fails', async () => {
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'))
    global.fetch = mockFetch

    render(
      <ThemeProvider>
        <Overview />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument()
    })

    // 验证是否显示了默认数据 | Verify default data is shown
    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('March')).toBeInTheDocument()
  })
}) 