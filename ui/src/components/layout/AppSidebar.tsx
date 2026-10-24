"use client";

import {
  AlertTriangle,
  ArrowUpCircle,
  AudioLines,
  Brain,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleDollarSign,
  Database,
  FileText,
  Home,
  Key,
  LogOut,
  type LucideIcon,
  Megaphone,
  Phone,
  Plug,
  Settings,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { SidebarTeamSwitcher } from "@/components/layout/SidebarTeamSwitcher";
import ThemeToggle from "@/components/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppConfig } from "@/context/AppConfigContext";
import { useTelephonyConfigWarnings } from "@/context/TelephonyConfigWarningsContext";
import { useLatestReleaseVersion } from "@/hooks/useLatestReleaseVersion";
import type { LocalUser } from "@/lib/auth";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type SidebarNavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  showsTelephonyWarning?: boolean;
};

type SidebarNavSection = {
  label?: string;
  items: SidebarNavItem[];
};

const TELEPHONY_WARNING_COPY = "Action required";

const NAV_SECTIONS: SidebarNavSection[] = [
  {
    items: [
      {
        title: "Overview",
        url: "/overview",
        icon: Home,
      },
    ],
  },
  {
    label: "BUILD",
    items: [
      {
        title: "Voice Agents",
        url: "/workflow",
        icon: Workflow,
      },
      {
        title: "Providers",
        url: "/provider-connections",
        icon: Plug,
      },
      {
        title: "Models",
        url: "/model-configurations",
        icon: Brain,
      },
      {
        title: "Telephony",
        url: "/telephony-configurations",
        icon: Phone,
        showsTelephonyWarning: true,
      },
      {
        title: "Tools",
        url: "/tools",
        icon: Wrench,
      },
      {
        title: "Credentials",
        url: "/credentials",
        icon: ShieldCheck,
      },
      {
        title: "Files",
        url: "/files",
        icon: Database,
      },
      {
        title: "Campaigns",
        url: "/campaigns",
        icon: Megaphone,
      },
      {
        title: "Recordings",
        url: "/recordings",
        icon: AudioLines,
      },
      {
        title: "Developers",
        url: "/api-keys",
        icon: Key,
      },
    ],
  },
  {
    label: "MANAGE",
    items: [
      {
        title: "Agent Runs",
        url: "/usage",
        icon: TrendingUp,
      },
      {
        title: "Billing",
        url: "/billing",
        icon: CircleDollarSign,
      },
      {
        title: "Reports",
        url: "/reports",
        icon: FileText,
      }
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { provider, logout, user } = useAuth();
  const { config } = useAppConfig();
  const {
    telnyxMissingWebhookPublicKeyCount,
    vonageMissingSignatureSecretCount,
  } = useTelephonyConfigWarnings();
  const hasTelephonyWarning =
    telnyxMissingWebhookPublicKeyCount > 0 ||
    vonageMissingSignatureSecretCount > 0;
  const isCollapsed = !isMobile && state === "collapsed";

  // Version info from app config context
  const versionInfo = config ? { ui: config.uiVersion, api: config.apiVersion } : null;

  // Check for updates only on self-hosted (OSS) deployments — cloud is managed for the user.
  const { latest: latestRelease, isBehind, isLatest } = useLatestReleaseVersion(
    versionInfo?.ui,
    { enabled: config?.deploymentMode === "oss" },
  );

  const isActive = (path: string) => pathname.startsWith(path);

  const handleMobileNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const SidebarLink = ({ item }: { item: SidebarNavItem }) => {
    const isItemActive = isActive(item.url);
    const Icon = item.icon;
    const showWarningDot = item.showsTelephonyWarning && hasTelephonyWarning;
    const tooltip = {
      children: (
        <div className="notranslate" translate="no">
          <p>{item.title}</p>
          {showWarningDot && (
            <p className="text-amber-600 dark:text-amber-400">{TELEPHONY_WARNING_COPY}</p>
          )}
        </div>
      ),
    };
    const warningIndicator = (
      <AlertTriangle
        aria-label="Action required on a telephony configuration"
        className={cn(
          "text-amber-500",
          isCollapsed ? "absolute -right-0.5 -top-0.5 h-3 w-3" : "ml-auto h-3.5 w-3.5"
        )}
      />
    );

    return (
      <SidebarMenuButton
        asChild
        tooltip={tooltip}
        className={cn(
          "relative rounded-md text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isItemActive &&
            "bg-sidebar-accent font-semibold text-sidebar-accent-foreground before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-sidebar-primary"
        )}
      >
        <Link
          href={item.url}
          onClick={handleMobileNavClick}
          className={cn("relative", isCollapsed && "justify-center")}
          translate="no"
        >
          <Icon
            className={cn(
              "h-4 w-4 shrink-0",
              isItemActive && "text-sidebar-primary"
            )}
          />
          <span
            className={cn("notranslate min-w-0 flex-1 truncate", isCollapsed && "sr-only")}
            translate="no"
          >
            {item.title}
          </span>
          {showWarningDot && (
            isCollapsed ? (
              warningIndicator
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  {warningIndicator}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{TELEPHONY_WARNING_COPY}</p>
                </TooltipContent>
              </Tooltip>
            )
          )}
        </Link>
      </SidebarMenuButton>
    );
  };

  // Footer identity trigger: avatar initials only (no name), in a subtle
  // bordered circle. Same treatment expanded and collapsed.
  const displayIdentity =
    user?.displayName ||
    (user as { primaryEmail?: string } | undefined)?.primaryEmail ||
    (user as LocalUser | undefined)?.email ||
    "";
  const userInitials =
    displayIdentity
      .split(/[\s@]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s: string) => s[0]?.toUpperCase())
      .join("") || "U";

  const userChipTrigger = (
    <button
      type="button"
      className={cn(
        "flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isCollapsed && "flex-none justify-center"
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
        {userInitials}
      </span>
      {!isCollapsed && (
        <>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-sidebar-accent-foreground">
            {displayIdentity || "Account"}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/50" />
        </>
      )}
    </button>
  );

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="px-2 py-3 notranslate" translate="no">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
            <Link
              href="/"
              className="notranslate flex items-center gap-2 px-1"
              translate="no"
            >
              <BrandLogo className="h-6 text-sm" />
            </Link>
            {isBehind && latestRelease && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium leading-none text-amber-900 transition-opacity hover:opacity-80 dark:bg-amber-950 dark:text-amber-200"
                  >
                    <ArrowUpCircle className="h-3 w-3" />
                    Update
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Latest: {latestRelease} - click to see the update guide</p>
                </TooltipContent>
              </Tooltip>
            )}
            {isLatest && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center rounded-md border bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    Latest
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>You&apos;re running the latest release</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <SidebarTrigger className={cn("hover:bg-accent", isCollapsed && "mx-auto")}>
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </SidebarTrigger>
        </div>

        {provider === "stack" && (
          <div className={cn("mt-3 notranslate", isCollapsed && "hidden")} translate="no">
            <SidebarTeamSwitcher />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className={cn("notranslate", isCollapsed && "px-0")} translate="no">
        {NAV_SECTIONS.map((section, index) => (
          <SidebarGroup
            key={section.label ?? "overview"}
            className={index === 0 ? "mt-2" : "mt-6"}
          >
            {section.label && (
              <SidebarGroupLabel
                className={cn(
                  "notranslate text-[0.68rem] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/45",
                  isCollapsed && "hidden"
                )}
                translate="no"
              >
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarLink item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter
        className={cn("p-3 notranslate", isCollapsed && "p-2")}
        translate="no"
      >
        <div className={cn("flex items-center gap-1", isCollapsed && "flex-col")}>
          {provider !== "stack" && (
            <div className="flex min-w-0 flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {userChipTrigger}
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-60">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      {(user as LocalUser | undefined)?.email && (
                        <p className="text-xs text-muted-foreground">{(user as LocalUser).email}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Platform Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {provider === "stack" && (
            <div className="flex min-w-0 flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {userChipTrigger}
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-60">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      {user?.displayName && (
                        <p className="text-sm font-medium">{user.displayName}</p>
                      )}
                      {(user as { primaryEmail?: string })?.primaryEmail && (
                        <p className="text-xs text-muted-foreground">{(user as { primaryEmail?: string }).primaryEmail}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/handler/account-settings")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Account settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Platform Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="flex shrink-0 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="notranslate" translate="no">
                  <ThemeToggle
                    showLabel={false}
                    className="rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side={isCollapsed ? "right" : "top"}>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
