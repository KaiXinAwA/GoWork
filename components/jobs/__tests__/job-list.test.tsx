import { render, screen, waitFor } from '@testing-library/react'
import JobList from '../job-list'
import { ThemeProvider } from '@/components/theme-provider'

// Mock Response globally if not available in test environment
if (typeof Response === 'undefined') {
  global.Response = class Response {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: any;
    
    constructor(body?: any, options?: any) {
      this.body = body;
      this.status = options?.status || 200;
      this.statusText = options?.statusText || '';
      this.headers = options?.headers || {};
    }
    
    json() {
      return Promise.resolve(JSON.parse(this.body));
    }
    
    ok = true;
  } as any;
}

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
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    } as Response)

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
        companyName: '',
        location: 'Sydney',
        type: 'Full-time',
        description: 'Job description',
        requirements: 'Job requirements',
        experienceLevel: null,
        createdAt: new Date().toISOString(),
        skills: [],
        category: null
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockJobs)
    } as Response)

    render(
      <ThemeProvider>
        <JobList />
      </ThemeProvider>
    )

    // 等待视图更新完成
    await waitFor(() => screen.getAllByText('View Details'));
    
    // 检查公共元素
    const buttons = screen.getAllByText('View Details');
    expect(buttons).toHaveLength(2);
    
    // 检查第一个工作
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Sydney/)).toBeInTheDocument();
    expect(screen.getByText('Job description')).toBeInTheDocument();
    
    // 检查第二个工作
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp.*Melbourne/)).toBeInTheDocument();
    expect(screen.getByText('90k-110k')).toBeInTheDocument();
    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
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