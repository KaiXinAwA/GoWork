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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PlusCircle, Search, X, Edit, UserX, UserCheck, Download } from "lucide-react";

// 用户类型定义
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
  lastLogin: string;
  jobsApplied?: number;
  jobsPosted?: number;
}

// 模拟用户数据
const usersData: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'JOBSEEKER', status: 'active', created: '2024-02-15', lastLogin: '2024-03-15', jobsApplied: 12 },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'EMPLOYER', status: 'active', created: '2024-02-10', lastLogin: '2024-03-20', jobsPosted: 5 },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'JOBSEEKER', status: 'inactive', created: '2024-01-25', lastLogin: '2024-02-28', jobsApplied: 8 },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'ADMIN', status: 'active', created: '2023-12-05', lastLogin: '2024-03-21', },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'EMPLOYER', status: 'active', created: '2024-01-18', lastLogin: '2024-03-18', jobsPosted: 3 },
  { id: 6, name: '孙八', email: 'sunba@example.com', role: 'JOBSEEKER', status: 'active', created: '2024-02-20', lastLogin: '2024-03-10', jobsApplied: 5 },
  { id: 7, name: '周九', email: 'zhoujiu@example.com', role: 'JOBSEEKER', status: 'inactive', created: '2024-01-30', lastLogin: '2024-02-15', jobsApplied: 2 },
  { id: 8, name: '吴十', email: 'wushi@example.com', role: 'EMPLOYER', status: 'active', created: '2024-02-05', lastLogin: '2024-03-19', jobsPosted: 8 },
];

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // 检查用户是否是管理员
  if (session && session.user.role !== "ADMIN") {
    router.push('/');
    return null;
  }

  // 筛选用户
  const filteredUsers = usersData.filter(user => {
    // 搜索过滤
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 角色过滤
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    // 状态过滤
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 打开编辑对话框
  const handleEditUser = (user: User) => {
    setCurrentUser({...user});
    setIsEditDialogOpen(true);
  };

  // 确认更新用户
  const handleUpdateUser = () => {
    // 这里会有实际的API调用来更新用户
    console.log('更新用户:', currentUser);
    // 临时更新前端显示
    if (currentUser) {
      // 实际应用中应该通过API请求更新后端数据
      // 这里省略了暂时不使用的代码
    }
    
    setIsEditDialogOpen(false);
  };

  // 打开删除对话框
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // 确认删除用户
  const handleDeleteUser = () => {
    // 这里会有实际的API调用来删除/禁用用户
    console.log('删除/禁用用户:', userToDelete);
    
    // 临时更新前端显示
    if (userToDelete) {
      // 实际应用中应该通过API请求更新后端数据
      // 这里省略了暂时不使用的代码
    }
    
    // 关闭对话框
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
                <h1 className="text-3xl font-bold">用户管理</h1>
                <p className="text-gray-500 mt-1">管理平台所有用户账户</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> 导出用户数据
                </Button>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" /> 添加用户
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>用户列表</CardTitle>
                <CardDescription>当前共有 {usersData.length} 个用户账户</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="搜索用户名或邮箱..."
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
                    <div className="flex gap-4">
                      <div className="w-40">
                        <Select 
                          value={selectedRole} 
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="筛选角色" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">所有角色</SelectItem>
                            <SelectItem value="ADMIN">管理员</SelectItem>
                            <SelectItem value="EMPLOYER">招聘者</SelectItem>
                            <SelectItem value="JOBSEEKER">求职者</SelectItem>
                          </SelectContent>
                        </Select>
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
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>姓名</TableHead>
                          <TableHead>邮箱</TableHead>
                          <TableHead>角色</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>注册日期</TableHead>
                          <TableHead>最近登录</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'EMPLOYER' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {user.role === 'ADMIN' ? '管理员' :
                                 user.role === 'EMPLOYER' ? '招聘者' : '求职者'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status === 'active' ? '活跃' : '禁用'}
                              </span>
                            </TableCell>
                            <TableCell>{user.created}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">编辑</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className={`h-8 w-8 p-0 ${user.status === 'active' ? 'text-red-600' : 'text-green-600'}`}
                                  onClick={() => handleDeleteClick(user)}
                                >
                                  {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                  <span className="sr-only">{user.status === 'active' ? '禁用' : '启用'}</span>
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

      {/* 编辑用户对话框 */}
      {currentUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>编辑用户</DialogTitle>
              <DialogDescription>
                更新用户信息及权限设置
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input
                  id="name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  邮箱
                </Label>
                <Input
                  id="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  角色
                </Label>
                <Select 
                  value={currentUser.role} 
                  onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                >
                  <SelectTrigger className="col-span-3" id="role">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">管理员</SelectItem>
                    <SelectItem value="EMPLOYER">招聘者</SelectItem>
                    <SelectItem value="JOBSEEKER">求职者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  状态
                </Label>
                <Select 
                  value={currentUser.status} 
                  onValueChange={(value) => setCurrentUser({...currentUser, status: value})}
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
              <Button onClick={handleUpdateUser}>保存更改</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 删除/禁用用户确认对话框 */}
      {userToDelete && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{userToDelete.status === 'active' ? '禁用用户' : '启用用户'}</DialogTitle>
              <DialogDescription>
                {userToDelete.status === 'active' 
                  ? `您确定要禁用用户 "${userToDelete.name}" 吗？禁用后该用户将无法登录。` 
                  : `您确定要启用用户 "${userToDelete.name}" 吗？启用后该用户将可以正常使用平台。`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>取消</Button>
              <Button 
                variant={userToDelete.status === 'active' ? 'destructive' : 'default'}
                onClick={handleDeleteUser}
              >
                {userToDelete.status === 'active' ? '禁用' : '启用'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 