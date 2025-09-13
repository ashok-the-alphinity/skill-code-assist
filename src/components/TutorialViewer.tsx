import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle
} from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  rating: number;
  steps: TutorialStep[];
}

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  code?: string;
  completed: boolean;
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "JavaScript Variables and Data Types",
    description: "Learn the fundamentals of JavaScript variables, strings, numbers, and booleans.",
    duration: "15 mins",
    difficulty: "Beginner",
    students: 1250,
    rating: 4.8,
    steps: [
      {
        id: "1-1",
        title: "Introduction to Variables",
        content: "Variables are containers that store data values. In JavaScript, you can declare variables using 'let', 'const', or 'var'.",
        code: `// Declaring variables
let message = "Hello, World!";
const pi = 3.14159;
var age = 25;

console.log(message);`,
        completed: true
      },
      {
        id: "1-2", 
        title: "String Data Type",
        content: "Strings represent text data. They can be enclosed in single quotes, double quotes, or backticks for template literals.",
        code: `// String examples
let firstName = "John";
let lastName = 'Doe';
let fullName = \`\${firstName} \${lastName}\`;

console.log(fullName);`,
        completed: true
      },
      {
        id: "1-3",
        title: "Number Data Type",
        content: "Numbers in JavaScript can be integers or floating-point values. JavaScript has only one number type.",
        code: `// Number examples
let integer = 42;
let decimal = 3.14;
let negative = -10;

console.log(integer + decimal);`,
        completed: false
      }
    ]
  },
  {
    id: "2",
    title: "Functions in JavaScript", 
    description: "Master JavaScript functions, parameters, return values, and different function syntaxes.",
    duration: "20 mins",
    difficulty: "Beginner",
    students: 980,
    rating: 4.7,
    steps: [
      {
        id: "2-1",
        title: "Function Declaration",
        content: "Functions are reusable blocks of code. You can declare them using the 'function' keyword.",
        code: `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));`,
        completed: false
      }
    ]
  }
];

interface TutorialViewerProps {
  onNavigate?: (section: string) => void;
}

export const TutorialViewer = ({ onNavigate }: TutorialViewerProps) => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const difficultyColors = {
    Beginner: "bg-secondary text-secondary-foreground",
    Intermediate: "bg-accent text-accent-foreground", 
    Advanced: "bg-destructive text-destructive-foreground"
  };

  const startTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (selectedTutorial && currentStepIndex < selectedTutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const resetTutorial = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  if (selectedTutorial) {
    const currentStep = selectedTutorial.steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / selectedTutorial.steps.length) * 100;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedTutorial(null)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Tutorials
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedTutorial.title}</h2>
              <p className="text-muted-foreground">Step {currentStepIndex + 1} of {selectedTutorial.steps.length}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetTutorial}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </Card>

        {/* Current Step */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${currentStep.completed ? 'text-secondary' : 'text-muted-foreground'}`} />
                <h3 className="text-xl font-semibold">{currentStep.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{currentStep.content}</p>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep} 
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={currentStepIndex === selectedTutorial.steps.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Code Example */}
          {currentStep.code && (
            <Card className="flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-sm font-medium">Code Example</span>
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Try It
                </Button>
              </div>
              <div className="flex-1 bg-code-bg">
                <pre className="text-code-foreground font-mono text-sm p-4 overflow-auto">
                  {currentStep.code}
                </pre>
              </div>
            </Card>
          )}
        </div>

        {/* Step Navigation */}
        <Card className="p-4">
          <div className="flex gap-2 overflow-x-auto">
            {selectedTutorial.steps.map((step, index) => (
              <Button
                key={step.id}
                variant={index === currentStepIndex ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStepIndex(index)}
                className="flex-shrink-0"
              >
                {step.completed && <CheckCircle className="w-3 h-3 mr-1" />}
                {index + 1}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Interactive Tutorials</h2>
        <p className="text-muted-foreground">Step-by-step lessons to master programming concepts</p>
      </div>

      {/* Featured Tutorial */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">New to Programming?</h3>
            <p className="text-muted-foreground mb-3">Start with our beginner-friendly JavaScript fundamentals course.</p>
            <Button variant="hero" onClick={() => startTutorial(tutorials[0])}>
              Start Learning
            </Button>
          </div>
        </div>
      </Card>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground">{tutorial.description}</p>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm">
                <Badge className={difficultyColors[tutorial.difficulty]}>
                  {tutorial.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {tutorial.duration}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {tutorial.students.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-3 h-3 fill-current text-accent" />
                  {tutorial.rating}
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{tutorial.steps.filter(s => s.completed).length}/{tutorial.steps.length}</span>
                </div>
                <Progress value={(tutorial.steps.filter(s => s.completed).length / tutorial.steps.length) * 100} />
              </div>

              {/* Action */}
              <Button 
                className="w-full" 
                variant={tutorial.steps.some(s => s.completed) ? "outline" : "default"}
                onClick={() => startTutorial(tutorial)}
              >
                {tutorial.steps.some(s => s.completed) ? "Continue" : "Start Tutorial"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};