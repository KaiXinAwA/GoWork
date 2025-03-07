import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          {/* About Us */}
          <div>
            <h3 className="font-semibold mb-3">关于 GoWork</h3>
            <p className="text-sm text-muted-foreground">
              连接求职者和雇主的简单招聘平台，让找工作变得更简单。
            </p>
          </div>

          {/* 求职者 */}
          {/* Job Seekers */}
          <div>
            <h3 className="font-semibold mb-3">求职者</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                  浏览职位
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                  创建简历
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-muted-foreground hover:text-foreground">
                  已保存职位
                </Link>
              </li>
            </ul>
          </div>

          {/* 雇主 */}
          {/* Employers */}
          <div>
            <h3 className="font-semibold mb-3">雇主</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-foreground">
                  发布职位
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  定价方案
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  招聘资源
                </Link>
              </li>
            </ul>
          </div>

          {/* 支持 */}
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">支持</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GoWork. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

