type NavbarProps = {
  title?: string;
};

const Navbar = ({ title = "Dashboard" }: NavbarProps) => (
  <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 lg:hidden"
        aria-label="Open menu"
      >
        <span className="text-xs font-semibold">Menu</span>
      </button>
      <div className="text-lg font-semibold text-slate-800">{title}</div>
    </div>

    <div className="hidden flex-1 items-center justify-center px-4 md:flex">
      <div className="w-full max-w-md">
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">
          Search
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full border border-slate-200 bg-slate-100" />
    </div>
  </div>
);

export default Navbar;
