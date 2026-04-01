"use client"

import { useState } from "react"
import { useLayout, layoutConfig } from "@/contexts/layout-context"
import {
  LayoutCard,
  LayoutCardHeader,
  LayoutCardContent,
  LayoutCardTitle,
  LayoutCardDescription,
} from "@/components/layout-aware/layout-card"
import {
  LayoutTable,
  LayoutTableHeader,
  LayoutTableBody,
  LayoutTableRow,
  LayoutTableHead,
  LayoutTableCell,
} from "@/components/layout-aware/layout-table"
import {
  LayoutModal,
  LayoutModalHeader,
  LayoutModalContent,
  LayoutModalFooter,
} from "@/components/layout-aware/layout-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-4.5%",
    trend: "down",
    icon: Activity,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "+12.3%",
    trend: "up",
    icon: Clock,
  },
]

const recentProjects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "completed",
    progress: 100,
    team: ["JD", "SK", "AM"],
  },
  {
    id: 2,
    name: "Mobile App v2.0",
    status: "in-progress",
    progress: 68,
    team: ["JD", "MR"],
  },
  {
    id: 3,
    name: "API Integration",
    status: "in-progress",
    progress: 45,
    team: ["SK", "AM", "JD", "MR"],
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    status: "pending",
    progress: 12,
    team: ["AM"],
  },
]

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "completed task",
    target: "User Authentication",
    time: "2m ago",
  },
  {
    id: 2,
    user: "Sarah Kim",
    action: "commented on",
    target: "API Documentation",
    time: "15m ago",
  },
  {
    id: 3,
    user: "Alex Morgan",
    action: "uploaded file to",
    target: "Design Assets",
    time: "1h ago",
  },
  {
    id: 4,
    user: "Mike Ross",
    action: "created project",
    target: "Q1 Marketing",
    time: "3h ago",
  },
]

export function DashboardContent() {
  const { layout } = useLayout()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof recentProjects)[0] | null>(null)

  const gridCols = {
    classic: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    topnav: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    command: "grid-cols-2 lg:grid-cols-4",
    floating: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    zen: "grid-cols-1 md:grid-cols-2",
  }

  const spacing = {
    classic: "gap-6",
    topnav: "gap-4",
    command: "gap-2",
    floating: "gap-5",
    zen: "gap-8",
  }

  const statusColors = {
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  }

  const statusIcons = {
    completed: CheckCircle2,
    "in-progress": Clock,
    pending: AlertCircle,
  }

  return (
    <div className={cn("space-y-6", layout === "zen" && "space-y-10")}>
      {/* Page Header */}
      <div className={cn(layout === "command" && "font-mono")}>
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
          {layout === "command" ? "[DASHBOARD]" : "Dashboard"}
        </h1>
        <p
          className={cn(
            "text-muted-foreground mt-1",
            layout === "command" && "text-xs uppercase tracking-wide",
            layout === "zen" && "text-lg font-light mt-2"
          )}
        >
          {layout === "command"
            ? "// System overview and metrics"
            : "Welcome back! Here's what's happening."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className={cn("grid", gridCols[layout], spacing[layout])}>
        {stats.map((stat, index) => (
          <LayoutCard key={index} hover>
            <LayoutCardContent>
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    layout === "command" && "rounded-none bg-primary/10",
                    layout !== "command" && "bg-muted"
                  )}
                >
                  <stat.icon
                    className={cn(
                      "h-5 w-5",
                      layout === "command" && "h-4 w-4 text-primary"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm",
                    stat.trend === "up" ? "text-green-500" : "text-destructive"
                  )}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className={cn(layout === "command" && "font-mono text-xs")}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    layout === "command" && "text-[10px] uppercase tracking-wider font-mono"
                  )}
                >
                  {stat.title}
                </p>
                <p
                  className={cn(
                    "text-2xl font-bold mt-1",
                    layout === "command" && "font-mono text-xl",
                    layout === "zen" && "text-3xl font-light"
                  )}
                >
                  {stat.value}
                </p>
              </div>
            </LayoutCardContent>
          </LayoutCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-3",
          spacing[layout],
          layout === "zen" && "lg:grid-cols-2"
        )}
      >
        {/* Projects Table */}
        <div className="lg:col-span-2">
          <LayoutCard>
            <LayoutCardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <LayoutCardTitle>Recent Projects</LayoutCardTitle>
                  <LayoutCardDescription>Track your team's progress</LayoutCardDescription>
                </div>
                <Button
                  variant={layout === "command" ? "outline" : "ghost"}
                  size="sm"
                  className={cn(layout === "command" && "rounded-none font-mono text-xs")}
                >
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </LayoutCardHeader>
            <LayoutCardContent>
              <LayoutTable>
                <LayoutTableHeader>
                  <LayoutTableRow>
                    <LayoutTableHead>Project</LayoutTableHead>
                    <LayoutTableHead>Status</LayoutTableHead>
                    <LayoutTableHead className="hidden sm:table-cell">Progress</LayoutTableHead>
                    <LayoutTableHead className="hidden md:table-cell">Team</LayoutTableHead>
                    <LayoutTableHead className="w-10"></LayoutTableHead>
                  </LayoutTableRow>
                </LayoutTableHeader>
                <LayoutTableBody>
                  {recentProjects.map((project) => {
                    const StatusIcon = statusIcons[project.status as keyof typeof statusIcons]
                    return (
                      <LayoutTableRow
                        key={project.id}
                        clickable
                        onClick={() => {
                          setSelectedProject(project)
                          setModalOpen(true)
                        }}
                      >
                        <LayoutTableCell>
                          <span className="font-medium">{project.name}</span>
                        </LayoutTableCell>
                        <LayoutTableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              statusColors[project.status as keyof typeof statusColors],
                              layout === "command" && "rounded-none font-mono text-[10px] uppercase"
                            )}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {project.status}
                          </Badge>
                        </LayoutTableCell>
                        <LayoutTableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={project.progress}
                              className={cn(
                                "h-2 w-20",
                                layout === "command" && "h-1 rounded-none"
                              )}
                            />
                            <span
                              className={cn(
                                "text-xs text-muted-foreground",
                                layout === "command" && "font-mono"
                              )}
                            >
                              {project.progress}%
                            </span>
                          </div>
                        </LayoutTableCell>
                        <LayoutTableCell className="hidden md:table-cell">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, i) => (
                              <Avatar
                                key={i}
                                className={cn(
                                  "h-7 w-7 border-2 border-background",
                                  layout === "command" && "rounded-none"
                                )}
                              >
                                <AvatarFallback
                                  className={cn(
                                    "text-[10px]",
                                    layout === "command" && "rounded-none font-mono"
                                  )}
                                >
                                  {member}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {project.team.length > 3 && (
                              <div
                                className={cn(
                                  "h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] border-2 border-background",
                                  layout === "command" && "rounded-none"
                                )}
                              >
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>
                        </LayoutTableCell>
                        <LayoutTableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8", layout === "command" && "rounded-none")}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </LayoutTableCell>
                      </LayoutTableRow>
                    )
                  })}
                </LayoutTableBody>
              </LayoutTable>
            </LayoutCardContent>
          </LayoutCard>
        </div>

        {/* Activity Feed */}
        <div className={cn(layout === "zen" && "lg:col-span-2")}>
          <LayoutCard>
            <LayoutCardHeader>
              <LayoutCardTitle>Recent Activity</LayoutCardTitle>
              <LayoutCardDescription>What your team has been up to</LayoutCardDescription>
            </LayoutCardHeader>
            <LayoutCardContent>
              <div className={cn("space-y-4", layout === "command" && "space-y-2")}>
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={cn(
                      "flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0",
                      layout === "command" && "pb-2"
                    )}
                  >
                    <Avatar
                      className={cn(
                        "h-9 w-9",
                        layout === "command" && "h-7 w-7 rounded-none"
                      )}
                    >
                      <AvatarFallback
                        className={cn(
                          "text-xs",
                          layout === "command" && "rounded-none font-mono text-[10px]"
                        )}
                      >
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm",
                          layout === "command" && "text-xs font-mono"
                        )}
                      >
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p
                        className={cn(
                          "text-xs text-muted-foreground mt-0.5",
                          layout === "command" && "font-mono text-[10px]"
                        )}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </LayoutCardContent>
          </LayoutCard>
        </div>
      </div>

      {/* Project Detail Modal */}
      <LayoutModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <LayoutModalHeader onClose={() => setModalOpen(false)}>
          <div>
            <h2
              className={cn(
                "text-lg font-semibold",
                layout === "command" && "font-mono text-sm uppercase tracking-wider"
              )}
            >
              {selectedProject?.name}
            </h2>
            <p className={cn("text-sm text-muted-foreground mt-0.5", layout === "command" && "font-mono text-xs")}>
              Project Details
            </p>
          </div>
        </LayoutModalHeader>
        <LayoutModalContent>
          {selectedProject && (
            <div className={cn("space-y-4", layout === "command" && "space-y-3")}>
              <div>
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    layout === "command" && "font-mono text-[10px] uppercase"
                  )}
                >
                  Status
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "mt-1",
                    statusColors[selectedProject.status as keyof typeof statusColors],
                    layout === "command" && "rounded-none font-mono"
                  )}
                >
                  {selectedProject.status}
                </Badge>
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    layout === "command" && "font-mono text-[10px] uppercase"
                  )}
                >
                  Progress
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Progress
                    value={selectedProject.progress}
                    className={cn("flex-1", layout === "command" && "rounded-none h-1")}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      layout === "command" && "font-mono text-xs"
                    )}
                  >
                    {selectedProject.progress}%
                  </span>
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    layout === "command" && "font-mono text-[10px] uppercase"
                  )}
                >
                  Team Members
                </p>
                <div className="flex gap-2 mt-2">
                  {selectedProject.team.map((member, i) => (
                    <Avatar
                      key={i}
                      className={cn(layout === "command" && "rounded-none")}
                    >
                      <AvatarFallback
                        className={cn(layout === "command" && "rounded-none font-mono")}
                      >
                        {member}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          )}
        </LayoutModalContent>
        <LayoutModalFooter>
          <Button
            variant="outline"
            onClick={() => setModalOpen(false)}
            className={cn(layout === "command" && "rounded-none font-mono text-xs")}
          >
            Close
          </Button>
          <Button className={cn(layout === "command" && "rounded-none font-mono text-xs")}>
            Open Project
          </Button>
        </LayoutModalFooter>
      </LayoutModal>
    </div>
  )
}
