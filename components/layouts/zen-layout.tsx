"use client"

import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Search,
  Folder,
  Calendar,
  MessageSquare,
  Zap,
  PanelLeft,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function ZenLayout({ children }: { children: ReactNode }) {
  const [navVisible, setNavVisible] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Top Bar - Only visible on hover/focus */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navVisible || searchFocused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
        onMouseEnter={() => setNavVisible(true)}
        onMouseLeave={() => !searchFocused && setNavVisible(false)}
      >
        <div className="flex items-center justify-between h-14 px-6 md:px-12 bg-gradient-to-b from-background to-transparent">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium">Nucleus</span>
          </Link>

          {/* Center Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 bg-transparent border-muted/30 focus:border-muted focus-visible:ring-0 rounded-lg text-sm"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-lg border-muted/30 bg-background/95 backdrop-blur-xl">
              <DropdownMenuItem className="rounded-md">Profile</DropdownMenuItem>
              <DropdownMenuItem className="rounded-md">
                <Link href="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-muted/20" />
              <DropdownMenuItem className="rounded-md text-muted-foreground">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Hover Zone for Header */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-40"
        onMouseEnter={() => setNavVisible(true)}
      />

      {/* Slide-out Navigation Panel */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-64 bg-background border-r border-muted/20 transform transition-transform duration-300",
          navVisible ? "translate-x-0" : "-translate-x-full"
        )}
        onMouseEnter={() => setNavVisible(true)}
        onMouseLeave={() => !searchFocused && setNavVisible(false)}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-muted/10">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Navigation</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={() => setNavVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all",
                item.href === "/" && "text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Side Hover Zone for Navigation */}
      <div
        className="fixed left-0 top-0 bottom-0 w-2 z-40"
        onMouseEnter={() => setNavVisible(true)}
      />

      {/* Toggle Button - Always Visible */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-30 h-9 w-9 rounded-lg bg-background/50 backdrop-blur-sm border border-muted/20"
        onClick={() => setNavVisible(!navVisible)}
      >
        <PanelLeft className="h-4 w-4" />
      </Button>

      {/* Main Content - Full Focus */}
      <main className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>

      {/* Mobile Bottom Nav - Minimal */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-muted/10 bg-background/80 backdrop-blur-xl flex items-center justify-around md:hidden z-40">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 text-muted-foreground/60 transition-colors",
              item.href === "/" && "text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </nav>
    </div>
  )
}
