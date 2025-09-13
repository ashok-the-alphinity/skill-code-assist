import { Book, Code, FileText, Home, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "editor", label: "Code Editor", icon: Code },
  { id: "exercises", label: "Exercises", icon: Target },
  { id: "tutorials", label: "Tutorials", icon: Book },
  { id: "analysis", label: "Analysis", icon: TrendingUp },
  { id: "docs", label: "Documentation", icon: FileText },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">CodeLearner</h1>
            <p className="text-xs text-muted-foreground">Learn. Code. Grow.</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg p-3">
          <div className="text-xs font-medium text-foreground mb-1">Daily Progress</div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full" style={{width: '73%'}}></div>
          </div>
          <div className="text-xs text-muted-foreground">7/10 exercises completed</div>
        </div>
      </div>
    </aside>
  );
};