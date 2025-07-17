import { Home, Building2, Users, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Visão Geral", href: "#", icon: Home, current: true },
  { name: "Condomínios", href: "#", icon: Building2, current: false },
  { name: "Moradores", href: "#", icon: Users, current: false },
  { name: "Cobranças", href: "#", icon: DollarSign, current: false },
  { name: "Configurações", href: "#", icon: Settings, current: false },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn("w-64 bg-sidebar-bg border-r border-border flex flex-col", className)}>
      {/* Header */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-border">
        <h1 className="text-xl font-bold text-gold">CondoAdmin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                item.current
                  ? "bg-gold text-white shadow-md"
                  : "text-text-secondary hover:bg-gold-hover hover:text-white"
              )}
            >
              <Icon className="size-5" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}