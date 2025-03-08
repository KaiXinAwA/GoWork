import { render, screen, waitFor } from '@testing-library/react'
import JobList from '../job-list'
import { ThemeProvider } from '@/components/theme-provider'

// Mock fetch with proper type
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('JobList Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('显示加载状态 | shows loading state', () => {
    render(
      <ThemeProvider>
        <JobList />
      </ThemeProvider>
    )

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('显示无职位信息 | shows no jobs message', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }))

    render(
      <ThemeProvider>
        <JobList />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('No jobs found')).toBeInTheDocument()
    })
  })

  it('显示职位列表 | displays job list', async () => {
    const mockJobs = [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Sydney',
        type: 'Full-time',
        description: 'Job description',
        requirements: 'Job requirements',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Product Manager',
        companyName: 'Tech Corp',
        location: 'Melbourne',
        description: 'Product management role',
        type: 'FULL_TIME',
        experienceLevel: 'Mid-Level',
        salary: '90k-110k',
        employer: { id: 'emp1', name: 'John Doe' },
        category: { id: 'cat1', name: 'Technology' },
        skills: [{ id: 'skill2', name: 'Product Management' }]
      }
    ]

    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(mockJobs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }))

    render(
      <ThemeProvider>
        <JobList />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getAllByText('View Details')).toHaveLength(2)
      expect(screen.getByText('Software Engineer')).toBeInTheDocument()
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
      expect(screen.getByText('Tech Corp')).toBeInTheDocument()
      expect(screen.getByText('Sydney')).toBeInTheDocument()
      expect(screen.getByText('Melbourne')).toBeInTheDocument()
    })
  })

  it('处理错误情况 | shows error message when loading fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(
      <ThemeProvider>
        <JobList />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Error loading jobs')).toBeInTheDocument()
  })
}) 