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
  Folder,
  Calendar,
  MessageSquare,
  Zap,
  Plus,
  X,
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
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: MessageSquare, label: "Messages", href: "/messages", badge: 3 },
]

export function FloatingLayout({ children }: { children: ReactNode }) {
  const [dockExpanded, setDockExpanded] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Header */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-card/80 backdrop-blur-2xl border border-border/50 shadow-xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Nucleus</span>
          </div>

          {/* Center Search */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-11 h-11 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-xl">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-3 w-3 bg-primary rounded-full border-2 border-card" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 rounded-xl focus:bg-accent">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">New team member</span>
                      <span className="text-xs text-muted-foreground">Sarah joined your team</span>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 rounded-xl focus:bg-accent">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <Folder className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">Project completed</span>
                      <span className="text-xs text-muted-foreground">Website redesign is live</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-xl hidden sm:flex">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl">Profile</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl">Billing</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl">
                  <Link href="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl text-destructive focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {searchOpen && (
          <div className="mt-3 p-3 rounded-2xl bg-card/80 backdrop-blur-2xl border border-border/50 shadow-xl md:hidden animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search..."
                className="pl-11 h-11 rounded-xl bg-muted/50 border-0"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-28 md:pb-8 px-4 md:px-6">{children}</main>

      {/* Floating Dock - Mobile */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="flex items-center justify-around p-2 rounded-2xl bg-card/80 backdrop-blur-2xl border border-border/50 shadow-xl">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 p-3 rounded-xl text-muted-foreground transition-all",
                item.href === "/" && "text-foreground bg-accent"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <Button
            size="icon"
            className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
            onClick={() => setDockExpanded(!dockExpanded)}
          >
            <Plus className={cn("h-5 w-5 transition-transform", dockExpanded && "rotate-45")} />
          </Button>
        </div>

        {/* Expanded Dock Actions */}
        {dockExpanded && (
          <div className="absolute bottom-full mb-3 left-0 right-0 flex justify-center animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-card/90 backdrop-blur-2xl border border-border/50 shadow-xl">
              {navItems.slice(4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDockExpanded(false)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Side Dock */}
      <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-card/60 backdrop-blur-2xl border border-border/50 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all group",
                item.href === "/" && "text-foreground bg-accent"
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full border-2 border-card">
                  {item.badge}
                </span>
              )}
              <span className="absolute left-full ml-3 px-2 py-1 text-sm rounded-lg bg-card border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )
}
