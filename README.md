# GoWork - 求职招聘平台 | Job Search Platform

## 项目简介 | Project Introduction
GoWork 是一个现代化的求职招聘平台，连接求职者和雇主。该平台提供直观的用户界面，让求职和招聘过程变得简单高效。

GoWork is a modern job search platform that connects job seekers with employers. The platform provides an intuitive user interface to make the job search and recruitment process simple and efficient.

## 项目进度 | Project Progress
- 🚀 完成登录注册系统 (2024/03) | Completed authentication system
- 🚀 修复TypeScript错误 (2024/03) | Fixed TypeScript errors
- 🚀 优化用户路由权限控制 (2024/03) | Enhanced route permission control
- 🚀 添加管理员界面 (2024/03) | Added admin interface
- 📋 职位搜索功能开发中 | Job search functionality in development
- 📋 应用投递功能开发中 | Job application submission in development

## MVP 功能 | MVP Features
### 求职者功能 | Job Seeker Features
- ✅ 用户注册和登录 | User Registration and Login
- ✅ 浏览职位列表 | Browse Job Listings
- ✅ 搜索职位 | Search Jobs
- 🔄 投递简历 | Submit Applications
- 🔄 查看申请状态 | Track Application Status
- ✅ 个人档案管理 | Profile Management

### 雇主功能 | Employer Features
- 🔄 发布职位 | Post Jobs
- 🔄 管理职位列表 | Manage Job Listings
- 🔄 查看申请人信息 | View Applicants
- 🔄 更新申请状态 | Update Application Status
- ✅ 公司档案管理 | Company Profile Management

### 平台功能 | Platform Features
- ✅ 响应式界面 | Responsive Interface
- ✅ 双语支持 | Bilingual Support
- 🔄 数据可视化 | Data Visualization
- ✅ 基于角色的访问控制 | Role-based Access Control
- 🔄 基础数据分析 | Basic Analytics

## 最新更新 | Latest Updates
- 🛠️ 修复了登录系统的安全问题 | Fixed security issues in login system
- 🧹 清理了无用的代码导入 | Cleaned up unused code imports
- 🚀 提升了表单验证和错误处理 | Enhanced form validation and error handling
- 🔒 优化了认证流程 | Optimized authentication flow
- 👥 实现了管理员面板 | Implemented admin panel
- 🛡️ 完善了权限控制中间件 | Improved permission control middleware

## 扩展功能规划 | Future Extensions

### 第一阶段 | Phase 1 (Q2 2024)
#### 求职者增强 | Job Seeker Enhancements
- 📋 简历生成器 | Resume Builder
- 🎯 职位推荐系统 | Job Recommendation System
- 📊 技能评估工具 | Skills Assessment Tools
- 📅 面试日程管理 | Interview Schedule Management

#### 雇主增强 | Employer Enhancements
- 🤖 简历筛选自动化 | Automated Resume Screening
- 📈 招聘数据分析 | Recruitment Analytics
- 📝 面试评估表格 | Interview Evaluation Forms
- 🎯 人才库管理 | Talent Pool Management

### 第二阶段 | Phase 2 (Q3 2024)
#### 社交功能 | Social Features
- 👥 专业社交网络 | Professional Networking
- 💬 即时通讯 | Instant Messaging
- 📱 移动应用 | Mobile App
- 🤝 职业社区 | Career Community

#### AI 功能 | AI Features
- 🤖 AI 面试助手 | AI Interview Assistant
- 📝 简历优化建议 | Resume Optimization Suggestions
- 💡 职业发展规划 | Career Path Planning
- 🎯 技能匹配分析 | Skills Match Analysis

### 第三阶段 | Phase 3 (Q4 2024)
#### 高级功能 | Advanced Features
- 📚 在线课程整合 | Online Course Integration
- 🎓 认证系统 | Certification System
- 🌍 全球化扩展 | Global Expansion
- 📊 高级数据分析 | Advanced Analytics

#### 企业解决方案 | Enterprise Solutions
- 🏢 ATS 系统集成 | ATS Integration
- 📊 人才管理系统 | Talent Management System
- 📈 预测性招聘分析 | Predictive Hiring Analytics
- 🤝 HR 流程自动化 | HR Process Automation

## 技术栈 | Tech Stack
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- Prisma (数据库 ORM | Database ORM)
- NextAuth.js (认证 | Authentication)
- Shadcn/ui (UI 组件 | UI Components)

## 功能特点 | Features
- 🔐 用户认证系统 | User Authentication System
- 💼 职位发布与搜索 | Job Posting and Search
- 📝 简历管理 | Resume Management
- 📱 响应式设计 | Responsive Design
- 🌐 双语支持 | Bilingual Support
- ⚡ 实时通知 | Real-time Notifications

## 项目结构 | Project Structure
```
GoWork/
├── app/                    # Next.js 应用程序路由和页面 | App routes and pages
│   ├── api/               # API 路由 | API routes
│   ├── auth/              # 认证相关页面 | Authentication pages
│   ├── admin/             # 管理员页面 | Admin pages
│   ├── employer/          # 雇主页面 | Employer pages
│   └── jobs/              # 职位相关页面 | Job related pages
├── components/            # React 组件 | React components
│   ├── ui/               # UI 组件 | UI components
│   ├── auth/             # 认证组件 | Authentication components
│   ├── jobs/             # 职位相关组件 | Job related components
│   └── layout/           # 布局组件 | Layout components
├── lib/                  # 工具函数和配置 | Utility functions and configs
├── prisma/               # 数据库模型和迁移 | Database models and migrations
├── public/               # 静态资源 | Static assets
└── styles/               # 全局样式 | Global styles
```

## 页面说明 | Pages Description
- `/` - 首页 | Homepage
- `/jobs` - 职位列表 | Job Listings
- `/auth/login` - 登录页面 | Login Page
- `/auth/register` - 注册页面 | Registration Page
- `/dashboard` - 求职者仪表板 | Job Seeker Dashboard
- `/employer` - 雇主仪表板 | Employer Dashboard
- `/admin` - 管理员仪表板 | Admin Dashboard
- `/profile` - 用户档案 | User Profile

## 开发指南 | Development Guide

### 环境要求 | Requirements
- Node.js 18+
- npm 或 yarn
- PostgreSQL 数据库 | PostgreSQL Database

### 安装步骤 | Installation Steps
1. 克隆项目 | Clone the project
```bash
git clone https://github.com/KaiXinAwA/GoWork.git
```

2. 安装依赖 | Install dependencies
```bash
npm install
# or
yarn install
```

3. 配置环境变量 | Configure environment variables
```bash
cp .env.example .env.local
```
编辑 .env.local 文件，填写必要的环境变量 | Edit .env.local and fill in the necessary environment variables

4. 运行开发服务器 | Run development server
```bash
npm run dev
# or
yarn dev
```

### API 路由 | API Routes
- `GET /api/jobs` - 获取职位列表 | Get job listings
- `POST /api/jobs/apply` - 提交职位申请 | Submit job application
- `GET /api/user/profile` - 获取用户档案 | Get user profile
- `POST /api/auth/*` - 认证相关接口 | Authentication related endpoints

## 测试账户 | Test Accounts
1. 求职者 | Job Seeker:
   - 邮箱 | Email: jobseeker@example.com
   - 密码 | Password: Password123!

2. 雇主 | Employer:
   - 邮箱 | Email: employer@example.com
   - 密码 | Password: Password123!

3. 管理员 | Admin:
   - 邮箱 | Email: admin@gowork.dev
   - 密码 | Password: Password123!

## 贡献指南 | Contributing
欢迎提交 Pull Requests 和 Issues。
Pull Requests and Issues are welcome.

## 许可证 | License
MIT 