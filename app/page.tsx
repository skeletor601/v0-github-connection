"use client"

import { LayoutProvider } from "@/contexts/layout-context"
import { LayoutShell } from "@/components/layouts/layout-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LayoutProvider>
        <LayoutShell>
          <DashboardContent />
        </LayoutShell>
      </LayoutProvider>
    </ThemeProvider>
  )
}
