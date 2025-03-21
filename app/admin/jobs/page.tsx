'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Search, X, Eye, Edit, Trash, Download, AlertCircle, CheckCircle2 } from "lucide-react";

// 模拟职位数据
const jobsData = [
  { 
    id: 1, 
    title: "高级前端开发工程师", 
    company: "科技创新有限公司", 
    location: "悉尼", 
    salary: "$120,000-$150,000", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-01", 
    expiryDate: "2024-04-01", 
    applications: 35,
    views: 278,
    employerId: 2
  },
  { 
    id: 2, 
    title: "业务分析师", 
    company: "金融服务集团", 
    location: "墨尔本", 
    salary: "$90,000-$110,000", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-05", 
    expiryDate: "2024-04-05", 
    applications: 28,
    views: 195,
    employerId: 5
  },
  { 
    id: 3, 
    title: "数据科学家", 
    company: "数据分析公司", 
    location: "布里斯班", 
    salary: "$130,000-$160,000", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-08", 
    expiryDate: "2024-04-08", 
    applications: 42,
    views: 321,
    employerId: 2
  },
  { 
    id: 4, 
    title: "产品经理", 
    company: "科技创新有限公司", 
    location: "悉尼", 
    salary: "$100,000-$130,000", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-10", 
    expiryDate: "2024-04-10", 
    applications: 31,
    views: 246,
    employerId: 2
  },
  { 
    id: 5, 
    title: "UX/UI设计师", 
    company: "创意设计工作室", 
    location: "珀斯", 
    salary: "$85,000-$105,000", 
    type: "全职", 
    status: "inactive", 
    postedDate: "2024-03-12", 
    expiryDate: "2024-04-12", 
    applications: 18,
    views: 173,
    employerId: 8
  },
  { 
    id: 6, 
    title: "DevOps工程师", 
    company: "云服务提供商", 
    location: "阿德莱德", 
    salary: "$110,000-$140,000", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-15", 
    expiryDate: "2024-04-15", 
    applications: 22,
    views: 189,
    employerId: 5
  },
  { 
    id: 7, 
    title: "销售代表", 
    company: "零售集团", 
    location: "悉尼", 
    salary: "$60,000-$80,000+佣金", 
    type: "全职", 
    status: "active", 
    postedDate: "2024-03-18", 
    expiryDate: "2024-04-18", 
    applications: 45,
    views: 287,
    employerId: 8
  },
  { 
    id: 8, 
    title: "客户支持专员", 
    company: "科技创新有限公司", 
    location: "墨尔本", 
    salary: "$55,000-$70,000", 
    type: "兼职", 
    status: "inactive", 
    postedDate: "2024-03-20", 
    expiryDate: "2024-04-20", 
    applications: 37,
    views: 215,
    employerId: 2
  },
];

// 职位类型
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  postedDate: string;
  expiryDate: string;
  applications: number;
  views: number;
  employerId: number;
};

export default function AdminJobsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // 检查用户是否是管理员
  if (session && session.user.role !== "ADMIN") {
    router.push('/');
    return null;
  }

  // 筛选职位
  const filteredJobs = jobsData.filter(job => {
    // 搜索过滤
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 状态过滤
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // 查看职位详情
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };

  // 编辑职位
  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsEditDialogOpen(true);
  };

  // 保存编辑的职位
  const handleSaveJob = () => {
    // 这里会有实际的API调用来更新职位
    console.log('保存职位:', selectedJob);
    // 实际应用中应该通过API请求更新后端数据
    
    setIsEditDialogOpen(false);
  };

  // 删除/禁用职位
  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  // 确认删除/禁用职位
  const handleConfirmDelete = () => {
    if (!selectedJob) return;
    
    // 这里会有实际的API调用来删除/禁用职位
    console.log('删除/禁用职位:', selectedJob);
    // 实际应用中应该通过API请求更新后端数据
    
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">职位管理</h1>
                <p className="text-gray-500 mt-1">管理平台所有发布的职位</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> 导出职位数据
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>职位列表</CardTitle>
                <CardDescription>当前共有 {jobsData.length} 个职位</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="搜索职位名称、公司或地点..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button 
                          className="absolute right-2.5 top-2.5"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                    <div className="w-40">
                      <Select 
                        value={selectedStatus} 
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="筛选状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">所有状态</SelectItem>
                          <SelectItem value="active">活跃</SelectItem>
                          <SelectItem value="inactive">禁用</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>职位名称</TableHead>
                          <TableHead>公司</TableHead>
                          <TableHead>地点</TableHead>
                          <TableHead>类型</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>发布日期</TableHead>
                          <TableHead>申请数</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredJobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.id}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{job.title}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{job.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={job.status === 'active' ? 'default' : 'destructive'}>
                                {job.status === 'active' ? '活跃' : '禁用'}
                              </Badge>
                            </TableCell>
                            <TableCell>{job.postedDate}</TableCell>
                            <TableCell>{job.applications}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewJob(job)}
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">查看</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditJob(job)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">编辑</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className={`h-8 w-8 p-0 ${job.status === 'active' ? 'text-red-600' : 'text-green-600'}`}
                                  onClick={() => handleDeleteClick(job)}
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">{job.status === 'active' ? '禁用' : '启用'}</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* 查看职位详情对话框 */}
      {selectedJob && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle className="text-xl">职位详情</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{selectedJob.company}</span>
                  <span>•</span>
                  <span>{selectedJob.location}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">薪资范围</p>
                  <p>{selectedJob.salary}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">工作类型</p>
                  <p>{selectedJob.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">发布日期</p>
                  <p>{selectedJob.postedDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">到期日期</p>
                  <p>{selectedJob.expiryDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">申请数量</p>
                  <p>{selectedJob.applications}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">浏览次数</p>
                  <p>{selectedJob.views}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">雇主ID</p>
                  <p>{selectedJob.employerId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">状态</p>
                  <div className="flex items-center gap-2">
                    {selectedJob.status === 'active' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">活跃</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-600">禁用</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>关闭</Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleEditJob(selectedJob);
                    }}
                  >
                    编辑职位
                  </Button>
                  <Button 
                    variant={selectedJob.status === 'active' ? 'destructive' : 'default'}
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleDeleteClick(selectedJob);
                    }}
                  >
                    {selectedJob.status === 'active' ? '禁用职位' : '启用职位'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 编辑职位对话框 */}
      {selectedJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>编辑职位</DialogTitle>
              <DialogDescription>
                更新职位信息和状态
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  职位名称
                </Label>
                <Input
                  id="title"
                  value={selectedJob.title}
                  onChange={(e) => setSelectedJob({...selectedJob, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  公司
                </Label>
                <Input
                  id="company"
                  value={selectedJob.company}
                  onChange={(e) => setSelectedJob({...selectedJob, company: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  地点
                </Label>
                <Input
                  id="location"
                  value={selectedJob.location}
                  onChange={(e) => setSelectedJob({...selectedJob, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  薪资
                </Label>
                <Input
                  id="salary"
                  value={selectedJob.salary}
                  onChange={(e) => setSelectedJob({...selectedJob, salary: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  类型
                </Label>
                <Select 
                  value={selectedJob.type}
                  onValueChange={(value) => setSelectedJob({...selectedJob, type: value})}
                >
                  <SelectTrigger className="col-span-3" id="type">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全职">全职</SelectItem>
                    <SelectItem value="兼职">兼职</SelectItem>
                    <SelectItem value="合同">合同</SelectItem>
                    <SelectItem value="实习">实习</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiryDate" className="text-right">
                  到期日期
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={selectedJob.expiryDate}
                  onChange={(e) => setSelectedJob({...selectedJob, expiryDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  状态
                </Label>
                <Select 
                  value={selectedJob.status}
                  onValueChange={(value) => setSelectedJob({...selectedJob, status: value})}
                >
                  <SelectTrigger className="col-span-3" id="status">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
              <Button onClick={handleSaveJob}>保存更改</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 删除/禁用职位确认对话框 */}
      {selectedJob && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedJob.status === 'active' ? '禁用职位' : '启用职位'}</DialogTitle>
              <DialogDescription>
                {selectedJob.status === 'active' 
                  ? `您确定要禁用"${selectedJob.title}"这个职位吗？禁用后该职位将不会在求职者页面显示。` 
                  : `您确定要启用"${selectedJob.title}"这个职位吗？启用后该职位将会在求职者页面显示。`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>取消</Button>
              <Button 
                variant={selectedJob.status === 'active' ? 'destructive' : 'default'}
                onClick={handleConfirmDelete}
              >
                {selectedJob.status === 'active' ? '禁用' : '启用'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 