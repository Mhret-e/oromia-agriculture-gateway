import { Link, useLocation } from "@tanstack/react-router";

export function VersionSwitch() {
  const { pathname } = useLocation();
  const options = [
    { to: "/", label: "V1" },
    { to: "/v2", label: "V2" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/90 p-1 shadow-soft backdrop-blur">
      {options.map((o) => (
        <Link
          key={o.to}
          to={o.to}
          className={
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors " +
            (pathname === o.to
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}