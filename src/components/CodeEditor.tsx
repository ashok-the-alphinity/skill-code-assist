import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RotateCcw, Download, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface CodeEditorProps {
  onCodeChange?: (code: string) => void;
  initialCode?: string;
}

export const CodeEditor = ({ onCodeChange, initialCode = "" }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode || `// Welcome to CodeLearner Editor!
// Write your JavaScript code here

function greet(name) {
  return \`Hello, \${name}! Welcome to coding!\`;
}

console.log(greet("Developer"));

// Try adding more functions below:
`);
  
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
    analyzeCode(newCode);
  };

  const analyzeCode = (codeToAnalyze: string) => {
    const newErrors: string[] = [];
    
    // Basic syntax checks
    if (codeToAnalyze.includes("consol.log")) {
      newErrors.push("Line: Did you mean 'console.log'?");
    }
    if (codeToAnalyze.includes("functio ")) {
      newErrors.push("Line: Did you mean 'function'?");
    }
    
    // Check for common issues
    const lines = codeToAnalyze.split('\n');
    lines.forEach((line, index) => {
      if (line.trim().startsWith('if') && !line.includes('{') && !line.includes('(')) {
        newErrors.push(`Line ${index + 1}: if statement might be missing parentheses`);
      }
    });
    
    setErrors(newErrors);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    try {
      // Create a safe execution environment
      const logs: string[] = [];
      const originalConsoleLog = console.log;
      
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.join(' '));
      };
      
      // Execute the code in a try-catch
      const result = eval(code);
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      if (logs.length > 0) {
        setOutput(logs.join('\n'));
      } else if (result !== undefined) {
        setOutput(String(result));
      } else {
        setOutput("Code executed successfully!");
      }
      
      toast.success("Code executed successfully!");
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error("Code execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode || `// Welcome to CodeLearner Editor!
// Write your JavaScript code here

function greet(name) {
  return \`Hello, \${name}! Welcome to coding!\`;
}

console.log(greet("Developer"));`);
    setOutput("");
    setErrors([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Code Editor */}
      <Card className="flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="ml-3 text-sm font-medium">main.js</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={runCode} disabled={isRunning}>
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full resize-none bg-code-bg text-code-foreground font-mono text-sm p-4 border-0 outline-none"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
        
        {/* Error Panel */}
        {errors.length > 0 && (
          <div className="border-t border-border bg-destructive/5 p-3">
            <div className="flex items-center gap-2 text-destructive text-sm font-medium mb-2">
              <AlertCircle className="w-4 h-4" />
              Issues Found ({errors.length})
            </div>
            <ul className="space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-xs text-destructive/80">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Output Console */}
      <Card className="flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="ml-3 text-sm font-medium">Output Console</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setOutput("")}>
            Clear
          </Button>
        </div>
        
        <div className="flex-1 bg-code-bg">
          <pre className="text-code-foreground font-mono text-sm p-4 h-full overflow-auto whitespace-pre-wrap">
            {output || "Click 'Run' to execute your code and see the output here..."}
          </pre>
        </div>
        
        {!errors.length && output && (
          <div className="border-t border-border bg-secondary/5 p-3">
            <div className="flex items-center gap-2 text-secondary text-sm">
              <CheckCircle className="w-4 h-4" />
              Execution completed successfully
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};