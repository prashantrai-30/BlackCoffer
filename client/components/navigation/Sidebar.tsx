const navItems = [
  "Overview",
  "Analytics",
  "Topics",
  "Regions",
  "Countries",
  "Sources",
  "Settings"
];

type SidebarProps = {
  activeItem?: string;
  title?: string;
};

const Sidebar = ({ activeItem = "Overview", title = "Insight Dashboard" }: SidebarProps) => (
  <div className="flex h-full flex-col">
    <div className="border-b border-slate-200 px-6 py-5">
      <div className="text-base font-semibold uppercase tracking-wide text-slate-700">
        {title}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Analytics Suite
      </div>
    </div>
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = item === activeItem;

          return (
            <li key={item}>
              <div
                className={
                  isActive
                    ? "rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                    : "rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                }
              >
                {item}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
    <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-400">
      Version 1.0
    </div>
  </div>
);

export default Sidebar;
