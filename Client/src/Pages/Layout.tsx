import { DarkLogo, LightLogo } from "@/components/hero-section";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useSidebarStore from "@/store/sidebarStore";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  StickyNote,
  Bell,
  Settings,
  ChevronRight,
  Menu,
  User,
} from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import axios from "axios";
import toast from "react-hot-toast";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const logOut = useAuthStore((state) => state.logout);

  function LogOut() {
    setLoading(true);
    axios
      .get("https://neuronest-oevp.onrender.com/api/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          toast.success(response.message);
          logOut();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const { theme } = useTheme();
  const setSidebar = useSidebarStore((state) => state.setSidebar);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    { name: "Notes", path: "notes", icon: StickyNote, badge: "12" },
    { name: "Reminders", path: "reminders", icon: Bell, badge: "3" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Sidebar Header */}
              <div className="h-20 flex items-center px-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 border border-primary/20">
                    {theme === "dark" ? (
                      <DarkLogo size="40" />
                    ) : (
                      <LightLogo size="40" />
                    )}
                  </div>
                  <div>
                    <h1 className="comic-neue-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      NeuroNST
                    </h1>
                  </div>
                </div>
              </div>

              {/* Mobile Sidebar Content */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-2 px-3 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Workspace
                    </span>
                  </div>

                  <nav className="space-y-2">
                    {navItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <NavLink
                          to={item.path}
                          key={item.name}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/50",
                              isActive
                                ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )
                          }
                          onClick={() => {
                            setSidebar(item.name);
                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" })
                            );
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-0.5"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                  <div className="px-3 mb-3">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Quick Actions
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-10"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 h-full flex-col border-r border-border bg-card/50 backdrop-blur-sm">
        {/* Header */}
        <div className="h-20 flex items-center px-6 border-b border-border/50">
          <div className="flex items-center gap-5">
            <div className="rounded-xl bg-primary/10 border border-primary/20">
              {theme === "dark" ? (
                <DarkLogo size="45" />
              ) : (
                <LightLogo size="45" />
              )}
            </div>

            <div>
              <h1 className="comic-neue-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NeuroNST
              </h1>
              <p className="text-xs text-muted-foreground">Second Brain App</p>
            </div>

            <div>
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Workspace
              </span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/50",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )
                    }
                    onClick={() => setSidebar(item.name)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="px-3 mb-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </span>
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>

                <Menu className="w-4 h-4 text-muted-foreground" />

                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button className="w-full h-full" onClick={LogOut}>
                      {loading ? <Loader /> : "Log Out"}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-border/50 flex items-center justify-end px-4">
          <ModeToggle />
        </div>

        <div className="h-[calc(100%-64px)] md:h-full p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
