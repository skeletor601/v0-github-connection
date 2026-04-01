"use client"

import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  Folder,
  Calendar,
  MessageSquare,
  Zap,
  Command,
  Keyboard,
  Activity,
  Cpu,
  Signal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/", shortcut: "D" },
  { icon: BarChart3, label: "Analytics", href: "/analytics", shortcut: "A" },
  { icon: Folder, label: "Projects", href: "/projects", shortcut: "P" },
  { icon: Users, label: "Team", href: "/team", shortcut: "T" },
  { icon: Calendar, label: "Calendar", href: "/calendar", shortcut: "C" },
  { icon: MessageSquare, label: "Messages", href: "/messages", badge: 3, shortcut: "M" },
  { icon: Settings, label: "Settings", href: "/settings", shortcut: "S" },
]

export function CommandLayout({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* HUD Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/60 backdrop-blur-xl">
        <div className="flex items-center h-12 px-4">
          {/* Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 flex items-center justify-center border border-primary/30 bg-primary/5">
                <Zap className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                NUCLEUS
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-muted-foreground/60">
              <div className="flex items-center gap-1">
                <Signal className="h-3 w-3 text-green-500" />
                <span>ONLINE</span>
              </div>
              <div className="flex items-center gap-1">
                <Cpu className="h-3 w-3" />
                <span>CPU 23%</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>128ms</span>
              </div>
            </div>
          </div>

          {/* Command Search */}
          <div className="flex-1 flex justify-center px-4">
            <Button
              variant="outline"
              className="w-full max-w-lg h-8 justify-start text-xs font-mono border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30"
              onClick={() => setCommandOpen(true)}
            >
              <Command className="h-3 w-3 mr-2" />
              <span className="text-muted-foreground">Command palette...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 border border-primary/20 bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 font-mono text-xs border border-transparent hover:border-primary/20"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <Badge
                    variant="outline"
                    className="ml-1.5 h-4 px-1 text-[10px] border-primary/30 bg-primary/10"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 rounded-none border-primary/20 bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-mono text-xs uppercase tracking-wider">
                  System Alerts
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem className="font-mono text-xs py-3 rounded-none focus:bg-primary/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground">[INFO] New team member</span>
                    <span className="text-muted-foreground text-[10px]">2024-01-15 14:32:00</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-mono text-xs py-3 rounded-none focus:bg-primary/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground">[SUCCESS] Deploy complete</span>
                    <span className="text-muted-foreground text-[10px]">2024-01-15 13:45:22</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 font-mono text-xs border border-transparent hover:border-primary/20"
                >
                  <Avatar className="h-5 w-5 rounded-none border border-primary/30">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="rounded-none text-[10px] bg-primary/10">JD</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden sm:inline">ADMIN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-none border-primary/20 bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-mono text-xs uppercase tracking-wider">
                  User Session
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem className="font-mono text-xs rounded-none focus:bg-primary/10">
                  Profile
                  <DropdownMenuShortcut className="font-mono">⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-mono text-xs rounded-none focus:bg-primary/10">
                  <Link href="/settings" className="w-full flex items-center justify-between">
                    Settings
                    <DropdownMenuShortcut className="font-mono">⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem className="font-mono text-xs text-destructive rounded-none focus:bg-destructive/10">
                  Terminate Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex pt-12">
        {/* Left Rail */}
        <aside className="fixed left-0 top-12 bottom-0 w-12 border-r border-primary/10 bg-background/60 backdrop-blur-xl hidden md:flex flex-col items-center py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 mb-1 border border-transparent text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all group",
                item.href === "/" && "text-foreground border-primary/30 bg-primary/10"
              )}
              title={item.label}
            >
              <item.icon className="h-4 w-4" />
              {item.badge && (
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 flex items-center justify-center text-[8px] bg-primary text-primary-foreground">
                  {item.badge}
                </span>
              )}
              <span className="absolute left-full ml-2 px-2 py-1 text-[10px] font-mono bg-background border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label} [{item.shortcut}]
              </span>
            </Link>
          ))}

          <div className="mt-auto">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 border border-transparent hover:border-primary/20"
            >
              <Keyboard className="h-4 w-4" />
            </Button>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-14 border-t border-primary/10 bg-background/80 backdrop-blur-xl flex items-center justify-around md:hidden z-50">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full text-muted-foreground",
                item.href === "/" && "text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute top-2 right-1/4 h-3.5 w-3.5 flex items-center justify-center text-[9px] bg-primary text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 md:ml-12 p-3 pb-20 md:pb-3">{children}</main>
      </div>

      {/* Command Palette Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="w-full max-w-lg border border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-primary/10 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Type a command or search..."
                className="border-0 bg-transparent h-12 font-mono text-sm focus-visible:ring-0"
              />
            </div>
            <div className="p-2">
              <div className="text-[10px] font-mono uppercase text-muted-foreground px-2 py-1.5">
                Quick Actions
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setCommandOpen(false)}
                  className="flex items-center gap-3 px-2 py-2.5 text-sm font-mono hover:bg-primary/10 transition-colors"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{item.label}</span>
                  <kbd className="ml-auto text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5">
                    {item.shortcut}
                  </kbd>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
