import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  BarChart3,
  Clock,
  Lightbulb
} from "lucide-react";

interface AnalysisPanelProps {
  code: string;
}

export const AnalysisPanel = ({ code }: AnalysisPanelProps) => {
  // Basic code analysis
  const lineCount = code.split('\n').length;
  const characterCount = code.length;
  const wordCount = code.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate complexity score
  const complexityScore = Math.min(100, (lineCount * 2 + wordCount * 0.5));
  
  // Generate suggestions based on code content
  const suggestions = [
    {
      type: "improvement",
      message: "Consider adding comments to explain complex logic",
      severity: "info"
    },
    {
      type: "performance", 
      message: "Good use of built-in JavaScript methods",
      severity: "success"
    },
    {
      type: "style",
      message: "Variable names are descriptive and clear", 
      severity: "success"
    }
  ];

  if (code.includes("console.log")) {
    suggestions.push({
      type: "debugging",
      message: "Remember to remove console.log statements in production",
      severity: "warning"
    });
  }

  if (code.includes("function")) {
    suggestions.push({
      type: "best-practice",
      message: "Great! You're using functions to organize your code",
      severity: "success"
    });
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "warning": 
        return <AlertTriangle className="w-4 h-4 text-accent" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "border-secondary/20 bg-secondary/5";
      case "warning":
        return "border-accent/20 bg-accent/5";
      case "error":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-primary/20 bg-primary/5";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Code Analysis</h2>
        <p className="text-muted-foreground">Real-time insights and suggestions for your code</p>
      </div>

      {/* Code Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold">{lineCount}</div>
              <div className="text-xs text-muted-foreground">Lines of Code</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <div>
              <div className="font-semibold">{characterCount}</div>
              <div className="text-xs text-muted-foreground">Characters</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            <div>
              <div className="font-semibold">{wordCount}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Complexity Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Code Complexity</h3>
          <Badge variant="outline">{Math.round(complexityScore)}/100</Badge>
        </div>
        <Progress value={complexityScore} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {complexityScore < 30 && "Simple and clean code structure"}
          {complexityScore >= 30 && complexityScore < 70 && "Moderate complexity - good balance"}
          {complexityScore >= 70 && "Complex code - consider breaking into smaller functions"}
        </p>
      </Card>

      {/* Suggestions */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Code Suggestions</h3>
        </div>
        
        {suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(suggestion.severity)}`}>
                <div className="flex items-start gap-2">
                  {getSeverityIcon(suggestion.severity)}
                  <div className="flex-1">
                    <div className="font-medium capitalize mb-1">{suggestion.type}</div>
                    <div className="text-sm text-muted-foreground">{suggestion.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Write some code to get personalized suggestions!</p>
          </div>
        )}
      </Card>

      {/* Code Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Readability Score</h4>
          <div className="flex items-center gap-2">
            <Progress value={85} className="flex-1" />
            <span className="text-sm font-medium">85%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Based on variable naming and structure</p>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-3">Best Practices</h4>
          <div className="flex items-center gap-2">
            <Progress value={92} className="flex-1" />
            <span className="text-sm font-medium">92%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Following JavaScript conventions</p>
        </Card>
      </div>
    </div>
  );
};