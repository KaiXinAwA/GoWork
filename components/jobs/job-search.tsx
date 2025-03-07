'use client';

import * as React from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function JobSearch() {
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (keyword) params.append("title", keyword);
    if (location) params.append("location", location);
    
    // 使用查询参数导航到职位页面
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="职位名称或关键词 / Job title or keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="地点 / Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Button type="submit" className="w-full md:w-auto">
        搜索职位 / Search Jobs
      </Button>
    </form>
  );
}