"use client"

import { useLayout } from "@/contexts/layout-context"
import { ClassicLayout } from "./classic-layout"
import { TopNavLayout } from "./topnav-layout"
import { CommandLayout } from "./command-layout"
import { FloatingLayout } from "./floating-layout"
import { ZenLayout } from "./zen-layout"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface LayoutShellProps {
  children: ReactNode
}

export function LayoutShell({ children }: LayoutShellProps) {
  const { layout } = useLayout()

  const layouts = {
    classic: ClassicLayout,
    topnav: TopNavLayout,
    command: CommandLayout,
    floating: FloatingLayout,
    zen: ZenLayout,
  }

  const LayoutComponent = layouts[layout]

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground transition-all duration-300",
        layout === "command" && "bg-background/95"
      )}
    >
      <LayoutComponent>{children}</LayoutComponent>
    </div>
  )
}
