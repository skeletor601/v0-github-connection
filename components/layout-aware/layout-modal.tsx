"use client"

import { useLayout } from "@/contexts/layout-context"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LayoutModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function LayoutModal({ open, onClose, children, className }: LayoutModalProps) {
  const { layout } = useLayout()

  if (!open) return null

  const overlayStyles = {
    classic: "bg-background/80 backdrop-blur-sm",
    topnav: "bg-background/60 backdrop-blur-xl",
    command: "bg-background/90 backdrop-blur-none",
    floating: "bg-background/40 backdrop-blur-2xl",
    zen: "bg-background/95 backdrop-blur-sm",
  }

  const contentStyles = {
    classic: "rounded-lg border shadow-lg bg-card max-w-lg",
    topnav: "rounded-2xl border-0 shadow-2xl bg-card/95 backdrop-blur-xl max-w-lg",
    command: "rounded-none border border-primary/20 bg-card/95 backdrop-blur-xl max-w-xl",
    floating: "rounded-3xl border-0 shadow-2xl bg-card/90 backdrop-blur-2xl max-w-lg",
    zen: "rounded-xl border-0 bg-card max-w-md",
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        overlayStyles[layout]
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full animate-in zoom-in-95 fade-in duration-200",
          contentStyles[layout],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function LayoutModalHeader({
  children,
  onClose,
  className,
}: {
  children: ReactNode
  onClose?: () => void
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "flex items-center justify-between p-6 border-b",
    topnav: "flex items-center justify-between p-6",
    command: "flex items-center justify-between p-4 border-b border-primary/10 font-mono",
    floating: "flex items-center justify-between p-6",
    zen: "flex items-center justify-between p-8",
  }

  const closeStyles = {
    classic: "h-8 w-8 rounded-md",
    topnav: "h-8 w-8 rounded-xl",
    command: "h-7 w-7 rounded-none border border-primary/20",
    floating: "h-9 w-9 rounded-full",
    zen: "h-8 w-8 rounded-lg",
  }

  return (
    <div className={cn(styles[layout], className)}>
      <div>{children}</div>
      {onClose && (
        <Button variant="ghost" size="icon" onClick={onClose} className={closeStyles[layout]}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export function LayoutModalContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "p-6",
    topnav: "p-6",
    command: "p-4",
    floating: "p-6",
    zen: "px-8 pb-8",
  }

  return <div className={cn(styles[layout], className)}>{children}</div>
}

export function LayoutModalFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { layout } = useLayout()

  const styles = {
    classic: "flex items-center justify-end gap-2 p-6 pt-0",
    topnav: "flex items-center justify-end gap-3 p-6 pt-0",
    command: "flex items-center justify-end gap-2 p-4 pt-0 font-mono text-xs",
    floating: "flex items-center justify-end gap-3 p-6 pt-0",
    zen: "flex items-center justify-end gap-4 px-8 pb-8",
  }

  return <div className={cn(styles[layout], className)}>{children}</div>
}
