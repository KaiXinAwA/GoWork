import { GET, POST } from '../route'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { JobType } from '@prisma/client'

// Mock next-auth
jest.mock('next-auth')
jest.mock('@/lib/prisma')

describe('Jobs API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/jobs', () => {
    it('成功获取职位列表 | successfully fetches jobs', async () => {
      const mockJobs = [
        {
          id: '1',
          title: 'Software Engineer',
          companyName: 'Tech Corp',
          location: 'Sydney',
          description: 'Full-stack developer role',
          type: 'FULL_TIME' as JobType,
          experienceLevel: 'Senior',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          employer: { id: 'emp1', name: 'John Doe' },
          category: { id: 'cat1', name: 'Technology' },
          skills: [{ id: 'skill1', name: 'React' }],
          applications: []
        }
      ]
      
      // Mock prisma.job.findMany
      ;(prisma.job.findMany as jest.Mock).mockResolvedValue(mockJobs)

      const response = await GET()
      const data = await response.json()

      expect(data).toEqual(mockJobs)
      expect(prisma.job.findMany).toHaveBeenCalledWith({
        include: {
          employer: true,
          category: true,
          skills: true,
          applications: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    })

    it('处理错误情况 | handles errors gracefully', async () => {
      // Mock prisma.job.findMany to throw error
      ;(prisma.job.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(data).toEqual({ error: 'Failed to fetch jobs' })
      expect(response.status).toBe(500)
    })
  })

  describe('POST /api/jobs', () => {
    const mockJob = {
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'Sydney',
      description: 'Full-stack developer role',
      requirements: 'React, Node.js experience required',
      salary: '100k-120k',
      categoryId: 'cat1',
      type: 'FULL_TIME' as JobType,
      experienceLevel: 'Senior',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    }

    const mockUser = {
      id: 'user1',
      role: 'EMPLOYER'
    }

    it('未认证用户无法创建职位 | prevents unauthorized job creation', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockJob)
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'Unauthorized' })
      expect(response.status).toBe(401)
    })

    it('非雇主用户无法创建职位 | prevents non-employer job creation', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: { ...mockUser, role: 'JOBSEEKER' }
      })

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockJob)
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'Only employers can create jobs' })
      expect(response.status).toBe(403)
    })

    it('处理缺失字段 | handles missing required fields', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ title: 'Software Engineer' })
      }))
      const data = await response.json()

      expect(data).toEqual({
        error: 'Missing required fields',
        missingFields: ['companyName', 'location', 'description', 'categoryId']
      })
      expect(response.status).toBe(400)
    })

    it('处理无效的工作类型 | handles invalid job type', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
          ...mockJob,
          type: 'INVALID_TYPE'
        })
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'Invalid job type' })
      expect(response.status).toBe(400)
    })

    it('处理过期的日期 | handles expired date', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
          ...mockJob,
          expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Yesterday
        })
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'Expiration date must be in the future' })
      expect(response.status).toBe(400)
    })

    it('成功创建职位 | successfully creates a job', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })
      
      const mockCreatedJob = {
        ...mockJob,
        id: 'job1',
        employerId: mockUser.id,
        isActive: true,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        employer: { id: mockUser.id, name: 'John Doe' },
        category: { id: 'cat1', name: 'Technology' },
        skills: []
      }
      
      ;(prisma.job.create as jest.Mock).mockResolvedValue(mockCreatedJob)

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockJob)
      }))
      const data = await response.json()

      expect(data).toEqual(mockCreatedJob)
      expect(prisma.job.create).toHaveBeenCalledWith({
        data: {
          ...mockJob,
          employerId: mockUser.id,
          isActive: true,
          expiresAt: expect.any(Date)
        },
        include: {
          employer: true,
          category: true,
          skills: true
        }
      })
    })

    it('处理重复职位标题 | handles duplicate job title', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })
      
      const prismaError = new Error('Unique constraint failed on the fields: (`title`)')
      ;(prismaError as any).code = 'P2002'
      ;(prisma.job.create as jest.Mock).mockRejectedValue(prismaError)

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockJob)
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'A job with this title already exists' })
      expect(response.status).toBe(409)
    })

    it('处理无效的外键 | handles invalid foreign key', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: mockUser
      })
      
      const prismaError = new Error('Foreign key constraint failed')
      ;(prismaError as any).code = 'P2003'
      ;(prisma.job.create as jest.Mock).mockRejectedValue(prismaError)

      const response = await POST(new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockJob)
      }))
      const data = await response.json()

      expect(data).toEqual({ error: 'Invalid category or employer ID' })
      expect(response.status).toBe(400)
    })
  })
}) 