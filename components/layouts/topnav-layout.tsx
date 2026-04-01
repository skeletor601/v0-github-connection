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
  X,
  Folder,
  Calendar,
  MessageSquare,
  Zap,
  ChevronDown,
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
  DropdownMenuGroup,
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

export function TopNavLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          {/* Primary Nav */}
          <div className="flex items-center h-16 px-4 lg:px-6">
            {/* Logo */}
            <div className="flex items-center gap-3 mr-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg hidden sm:block">Nucleus</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200",
                    item.href === "/" && "text-foreground bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <Badge className="h-5 px-1.5 text-xs rounded-full bg-primary/10 text-primary border-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search anything..."
                  className="pl-9 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-xl">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full ring-2 ring-background" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-xl border-0">
                  <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 rounded-lg focus:bg-accent">
                      <span className="font-medium">New team member joined</span>
                      <span className="text-xs text-muted-foreground">2 minutes ago</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 rounded-lg focus:bg-accent">
                      <span className="font-medium">Project milestone completed</span>
                      <span className="text-xs text-muted-foreground">1 hour ago</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings Quick Access */}
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="rounded-xl hidden sm:flex">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-xl gap-2 pl-2 pr-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium">John</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-0">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg">Billing</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg">
                    <Link href="/settings" className="w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg text-destructive focus:text-destructive">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden border-t border-border/50 p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all",
                      item.href === "/" && "text-foreground bg-accent"
                    )}
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
