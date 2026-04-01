"use client"

import { useLayout } from "@/contexts/layout-context"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface LayoutTableProps {
  children: ReactNode
  className?: string
}

export function LayoutTable({ children, className }: LayoutTableProps) {
  const { layout } = useLayout()

  const wrapperStyles = {
    classic: "rounded-lg border overflow-hidden",
    topnav: "rounded-xl overflow-hidden shadow-lg",
    command: "border border-primary/20",
    floating: "rounded-2xl overflow-hidden shadow-xl bg-card/90 backdrop-blur-xl",
    zen: "rounded-lg",
  }

  return (
    <div className={cn(wrapperStyles[layout], className)}>
      <table className="w-full">{children}</table>
    </div>
  )
}

export function LayoutTableHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "bg-muted/50",
    topnav: "bg-muted/30",
    command: "bg-primary/5 font-mono uppercase text-[10px] tracking-wider",
    floating: "bg-muted/20",
    zen: "border-b border-muted/20",
  }

  return <thead className={cn(styles[layout], className)}>{children}</thead>
}

export function LayoutTableBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <tbody className={className}>{children}</tbody>
}

export function LayoutTableRow({
  children,
  className,
  clickable = false,
}: {
  children: ReactNode
  className?: string
  clickable?: boolean
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "border-b border-border/50 last:border-0",
    topnav: "border-b border-border/30 last:border-0",
    command: "border-b border-primary/10 last:border-0",
    floating: "border-b border-border/20 last:border-0",
    zen: "",
  }

  const hoverStyles = {
    classic: "hover:bg-muted/50",
    topnav: "hover:bg-accent",
    command: "hover:bg-primary/10",
    floating: "hover:bg-accent/50",
    zen: "hover:bg-muted/20",
  }

  return (
    <tr
      className={cn(
        "transition-colors",
        styles[layout],
        clickable && cn("cursor-pointer", hoverStyles[layout]),
        className
      )}
    >
      {children}
    </tr>
  )
}

export function LayoutTableHead({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "px-4 py-3 text-left text-sm font-medium text-muted-foreground",
    topnav: "px-5 py-4 text-left text-sm font-semibold text-foreground",
    command: "px-3 py-2 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground",
    floating: "px-6 py-4 text-left text-sm font-medium text-muted-foreground",
    zen: "px-6 py-4 text-left text-sm font-light text-muted-foreground/80",
  }

  return <th className={cn(styles[layout], className)}>{children}</th>
}

export function LayoutTableCell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "px-4 py-3 text-sm",
    topnav: "px-5 py-4 text-sm",
    command: "px-3 py-2 text-xs font-mono",
    floating: "px-6 py-4 text-sm",
    zen: "px-6 py-5 text-base font-light",
  }

  return <td className={cn(styles[layout], className)}>{children}</td>
}
