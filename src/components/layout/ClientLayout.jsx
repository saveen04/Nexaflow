"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";

// Pages that render without the dashboard shell
const NO_LAYOUT_PAGES = ["/", "/login", "/signup", "/access", "/auth"];

export function ClientLayout({ children }) {
  const pathname = usePathname();
  const isNoLayout = NO_LAYOUT_PAGES.includes(pathname) || pathname.startsWith("/auth");

  if (isNoLayout) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)]">
        <TopNav />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
