"use client"

import { useLayout, layoutConfig } from "@/contexts/layout-context"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface LayoutCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function LayoutCard({ children, className, hover = false }: LayoutCardProps) {
  const { layout } = useLayout()
  const config = layoutConfig[layout]

  const baseStyles = {
    classic: "bg-card border shadow-sm rounded-lg",
    topnav: "bg-card/80 backdrop-blur-sm border-0 shadow-lg rounded-xl",
    command: "bg-card/50 backdrop-blur-md border border-primary/20 rounded-none",
    floating: "bg-card/90 backdrop-blur-xl border-0 shadow-xl rounded-2xl",
    zen: "bg-transparent border-0 rounded-lg",
  }

  const hoverStyles = {
    classic: "hover:shadow-md hover:border-primary/20",
    topnav: "hover:shadow-xl hover:scale-[1.01]",
    command: "hover:border-primary/40 hover:bg-card/70",
    floating: "hover:shadow-2xl hover:scale-[1.02]",
    zen: "hover:bg-muted/30",
  }

  return (
    <div
      className={cn(
        "transition-all duration-200",
        baseStyles[layout],
        hover && hoverStyles[layout],
        className
      )}
    >
      {children}
    </div>
  )
}

export function LayoutCardHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "p-6 pb-0",
    topnav: "p-5 pb-0",
    command: "p-3 pb-0 font-mono",
    floating: "p-6 pb-0",
    zen: "p-8 pb-0",
  }

  return <div className={cn(styles[layout], className)}>{children}</div>
}

export function LayoutCardContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "p-6",
    topnav: "p-5",
    command: "p-3",
    floating: "p-6",
    zen: "p-8",
  }

  return <div className={cn(styles[layout], className)}>{children}</div>
}

export function LayoutCardTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "text-lg font-semibold",
    topnav: "text-lg font-bold",
    command: "text-sm font-mono uppercase tracking-wider text-primary",
    floating: "text-xl font-bold",
    zen: "text-2xl font-light",
  }

  return <h3 className={cn(styles[layout], className)}>{children}</h3>
}

export function LayoutCardDescription({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "text-sm text-muted-foreground mt-1",
    topnav: "text-sm text-muted-foreground mt-1.5",
    command: "text-xs font-mono text-muted-foreground/70 mt-1 uppercase",
    floating: "text-sm text-muted-foreground mt-2",
    zen: "text-base text-muted-foreground/80 mt-2 font-light",
  }

  return <p className={cn(styles[layout], className)}>{children}</p>
}
