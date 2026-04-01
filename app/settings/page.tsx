"use client"

import { useLayout, layoutConfig, type LayoutMode } from "@/contexts/layout-context"
import {
  LayoutCard,
  LayoutCardHeader,
  LayoutCardContent,
  LayoutCardTitle,
  LayoutCardDescription,
} from "@/components/layout-aware/layout-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  LayoutPanelTop,
  Terminal,
  Smartphone,
  Minimize2,
  Check,
  Palette,
  Bell,
  Shield,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

const layoutIcons = {
  classic: Sidebar,
  topnav: LayoutPanelTop,
  command: Terminal,
  floating: Smartphone,
  zen: Minimize2,
}

const layoutPreviews = {
  classic: (
    <div className="w-full h-full flex">
      <div className="w-1/4 bg-muted/50 border-r border-border" />
      <div className="flex-1 p-2">
        <div className="h-2 w-full bg-muted/50 rounded mb-2" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 bg-muted/30 rounded" />
          <div className="h-6 bg-muted/30 rounded" />
        </div>
      </div>
    </div>
  ),
  topnav: (
    <div className="w-full h-full flex flex-col">
      <div className="h-3 w-full bg-muted/50 border-b border-border" />
      <div className="flex-1 p-2">
        <div className="grid grid-cols-3 gap-1">
          <div className="h-5 bg-muted/30 rounded-lg" />
          <div className="h-5 bg-muted/30 rounded-lg" />
          <div className="h-5 bg-muted/30 rounded-lg" />
        </div>
      </div>
    </div>
  ),
  command: (
    <div className="w-full h-full flex flex-col">
      <div className="h-2 w-full bg-primary/20 border-b border-primary/30" />
      <div className="flex flex-1">
        <div className="w-3 bg-primary/10 border-r border-primary/20" />
        <div className="flex-1 p-1">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-4 bg-primary/10" />
            <div className="h-4 bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  ),
  floating: (
    <div className="w-full h-full relative p-1.5">
      <div className="h-3 w-full bg-muted/50 rounded-full mb-1.5" />
      <div className="grid grid-cols-2 gap-1">
        <div className="h-5 bg-muted/30 rounded-xl" />
        <div className="h-5 bg-muted/30 rounded-xl" />
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-2 w-12 bg-muted/50 rounded-full" />
    </div>
  ),
  zen: (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-2/3 space-y-1">
        <div className="h-2 w-full bg-muted/30 rounded" />
        <div className="h-5 w-full bg-muted/20 rounded" />
      </div>
    </div>
  ),
}

export default function SettingsPage() {
  const { layout, setLayout } = useLayout()

  const settingsSections = [
    { icon: Palette, label: "Appearance", active: true },
    { icon: User, label: "Profile", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: Shield, label: "Security", active: false },
  ]

  return (
    <div className={cn("max-w-4xl mx-auto", layout === "command" && "font-mono")}>
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className={cn(
            "font-bold text-foreground",
            layout === "classic" && "text-2xl",
            layout === "topnav" && "text-3xl",
            layout === "command" && "text-lg uppercase tracking-wider",
            layout === "floating" && "text-3xl",
            layout === "zen" && "text-4xl font-light"
          )}
        >
          {layout === "command" ? "[SETTINGS]" : "Settings"}
        </h1>
        <p
          className={cn(
            "text-muted-foreground mt-1",
            layout === "command" && "text-xs uppercase tracking-wide",
            layout === "zen" && "text-lg font-light mt-2"
          )}
        >
          {layout === "command"
            ? "// System configuration and preferences"
            : "Manage your app preferences and appearance"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <LayoutCard>
            <LayoutCardContent>
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.label}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-md transition-colors text-left",
                      section.active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      layout === "command" && "rounded-none text-xs uppercase tracking-wider",
                      layout === "floating" && "rounded-xl",
                      layout === "zen" && "rounded-lg"
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </LayoutCardContent>
          </LayoutCard>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Layout Selector */}
          <LayoutCard>
            <LayoutCardHeader>
              <LayoutCardTitle>Layout Preset</LayoutCardTitle>
              <LayoutCardDescription>
                Choose your preferred interface layout. This affects navigation, spacing, and overall UI composition.
              </LayoutCardDescription>
            </LayoutCardHeader>
            <LayoutCardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.keys(layoutConfig) as LayoutMode[]).map((layoutKey) => {
                  const config = layoutConfig[layoutKey]
                  const Icon = layoutIcons[layoutKey]
                  const isActive = layout === layoutKey

                  return (
                    <button
                      key={layoutKey}
                      onClick={() => setLayout(layoutKey)}
                      className={cn(
                        "relative group text-left p-4 border rounded-lg transition-all duration-200",
                        isActive
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50 hover:bg-muted/30",
                        layout === "command" && "rounded-none",
                        layout === "floating" && "rounded-xl",
                        layout === "topnav" && "rounded-xl"
                      )}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <div
                          className={cn(
                            "absolute top-2 right-2 h-5 w-5 bg-primary text-primary-foreground flex items-center justify-center",
                            layout === "command" ? "rounded-none" : "rounded-full"
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                      )}

                      {/* Preview */}
                      <div
                        className={cn(
                          "h-20 mb-3 border border-border/50 bg-background overflow-hidden",
                          layout === "command" ? "rounded-none" : "rounded-md"
                        )}
                      >
                        {layoutPreviews[layoutKey]}
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={cn(
                            "font-medium",
                            layout === "command" && "text-xs uppercase tracking-wider"
                          )}
                        >
                          {config.name}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-xs text-muted-foreground line-clamp-2",
                          layout === "command" && "text-[10px] uppercase"
                        )}
                      >
                        {config.description}
                      </p>

                      {/* Active Badge */}
                      {isActive && (
                        <Badge
                          className={cn(
                            "mt-3",
                            layout === "command" && "rounded-none font-mono text-[10px]"
                          )}
                        >
                          Active
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </LayoutCardContent>
          </LayoutCard>

          {/* Additional Settings */}
          <LayoutCard>
            <LayoutCardHeader>
              <LayoutCardTitle>Display Options</LayoutCardTitle>
              <LayoutCardDescription>
                Fine-tune your display preferences
              </LayoutCardDescription>
            </LayoutCardHeader>
            <LayoutCardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      className={cn(layout === "command" && "font-mono text-xs uppercase")}
                    >
                      Compact Mode
                    </Label>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        layout === "command" && "text-[10px] uppercase"
                      )}
                    >
                      Reduce padding and spacing throughout the interface
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator className={cn(layout === "command" && "bg-primary/20")} />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      className={cn(layout === "command" && "font-mono text-xs uppercase")}
                    >
                      Animations
                    </Label>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        layout === "command" && "text-[10px] uppercase"
                      )}
                    >
                      Enable smooth transitions and micro-interactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator className={cn(layout === "command" && "bg-primary/20")} />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      className={cn(layout === "command" && "font-mono text-xs uppercase")}
                    >
                      Blur Effects
                    </Label>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        layout === "command" && "text-[10px] uppercase"
                      )}
                    >
                      Use backdrop blur for overlays and panels
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </LayoutCardContent>
          </LayoutCard>

          {/* Current Layout Info */}
          <LayoutCard>
            <LayoutCardHeader>
              <LayoutCardTitle>Current Layout Details</LayoutCardTitle>
            </LayoutCardHeader>
            <LayoutCardContent>
              <div
                className={cn(
                  "grid grid-cols-2 gap-4 text-sm",
                  layout === "command" && "font-mono text-xs"
                )}
              >
                <div>
                  <p className="text-muted-foreground">Card Style</p>
                  <p className="font-medium mt-0.5">{layoutConfig[layout].cardStyle}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Navigation</p>
                  <p className="font-medium mt-0.5">{layoutConfig[layout].navStyle}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spacing</p>
                  <p className="font-medium mt-0.5">{layoutConfig[layout].spacing}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dropdowns</p>
                  <p className="font-medium mt-0.5">{layoutConfig[layout].dropdownStyle}</p>
                </div>
              </div>
            </LayoutCardContent>
          </LayoutCard>
        </div>
      </div>
    </div>
  )
}
