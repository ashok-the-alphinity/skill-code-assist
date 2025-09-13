import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { CodeEditor } from "@/components/CodeEditor";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { TutorialViewer } from "@/components/TutorialViewer";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentCode, setCurrentCode] = useState("");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveSection} />;
      case "editor":
        return <CodeEditor onCodeChange={setCurrentCode} />;
      case "exercises":
        return <ExerciseLibrary onStartExercise={() => setActiveSection("editor")} />;
      case "tutorials":
        return <TutorialViewer onNavigate={setActiveSection} />;
      case "analysis":
        return <AnalysisPanel code={currentCode} />;
      case "docs":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Documentation</h2>
              <p className="text-muted-foreground">Comprehensive guides and API references</p>
            </div>
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Detailed documentation and guides are being prepared for you.
              </p>
            </Card>
          </div>
        );
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
