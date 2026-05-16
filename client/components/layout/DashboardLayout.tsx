import type { ReactNode } from "react";

type DashboardLayoutProps = {
  sidebar: ReactNode;
  navbar: ReactNode;
  children: ReactNode;
};

const DashboardLayout = ({ sidebar, navbar, children }: DashboardLayoutProps) => (
  <div className="min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        {sidebar}
      </aside>
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          {navbar}
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
