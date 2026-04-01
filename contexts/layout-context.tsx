"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type LayoutMode = "classic" | "topnav" | "command" | "floating" | "zen"

interface LayoutContextType {
  layout: LayoutMode
  setLayout: (layout: LayoutMode) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  isMobile: boolean
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>("classic")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("app-layout") as LayoutMode | null
    if (saved && ["classic", "topnav", "command", "floating", "zen"].includes(saved)) {
      setLayoutState(saved)
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const setLayout = (newLayout: LayoutMode) => {
    setLayoutState(newLayout)
    localStorage.setItem("app-layout", newLayout)
  }

  return (
    <LayoutContext.Provider
      value={{ layout, setLayout, sidebarCollapsed, setSidebarCollapsed, isMobile }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

export const layoutConfig: Record<
  LayoutMode,
  {
    name: string
    description: string
    cardStyle: string
    spacing: string
    navStyle: string
    dropdownStyle: string
  }
> = {
  classic: {
    name: "Classic",
    description: "Traditional sidebar navigation with familiar layout",
    cardStyle: "rounded-lg border shadow-sm",
    spacing: "gap-6 p-6",
    navStyle: "sidebar",
    dropdownStyle: "rounded-md",
  },
  topnav: {
    name: "Top Navigation",
    description: "Horizontal navigation bar with vertical content flow",
    cardStyle: "rounded-xl border-0 shadow-lg",
    spacing: "gap-4 p-4",
    navStyle: "horizontal",
    dropdownStyle: "rounded-xl",
  },
  command: {
    name: "Command Center",
    description: "HUD-style interface for power users",
    cardStyle: "rounded-none border border-primary/20 bg-card/50 backdrop-blur-sm",
    spacing: "gap-2 p-3",
    navStyle: "minimal",
    dropdownStyle: "rounded-none border-primary/30",
  },
  floating: {
    name: "Floating Dock",
    description: "Mobile-first with floating action dock",
    cardStyle: "rounded-2xl border-0 shadow-xl",
    spacing: "gap-5 p-5",
    navStyle: "dock",
    dropdownStyle: "rounded-2xl",
  },
  zen: {
    name: "Zen Mode",
    description: "Minimal distractions, maximum focus",
    cardStyle: "rounded-lg border-0 bg-transparent",
    spacing: "gap-8 p-8",
    navStyle: "hidden",
    dropdownStyle: "rounded-lg",
  },
}
