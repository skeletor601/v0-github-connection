"use client"

import { LayoutProvider } from "@/contexts/layout-context"
import { LayoutShell } from "@/components/layouts/layout-shell"
import { ThemeProvider } from "@/components/theme-provider"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LayoutProvider>
        <LayoutShell>{children}</LayoutShell>
      </LayoutProvider>
    </ThemeProvider>
  )
}
