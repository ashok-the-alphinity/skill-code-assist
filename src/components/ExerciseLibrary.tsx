import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Code, Star, ChevronRight, Filter } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  description: string;
  timeEstimate: string;
  points: number;
  completed: boolean;
  rating: number;
}

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Hello World Function",
    difficulty: "Beginner",
    category: "Functions",
    description: "Write a function that returns 'Hello, World!' when called.",
    timeEstimate: "5 mins",
    points: 10,
    completed: true,
    rating: 4.8
  },
  {
    id: "2", 
    title: "Array Sum Calculator",
    difficulty: "Beginner",
    category: "Arrays",
    description: "Create a function that calculates the sum of all numbers in an array.",
    timeEstimate: "10 mins",
    points: 20,
    completed: true,
    rating: 4.6
  },
  {
    id: "3",
    title: "Palindrome Checker",
    difficulty: "Intermediate",
    category: "Strings",
    description: "Write a function to check if a given string is a palindrome.",
    timeEstimate: "15 mins",
    points: 30,
    completed: false,
    rating: 4.7
  },
  {
    id: "4",
    title: "Binary Tree Traversal",
    difficulty: "Advanced",
    category: "Data Structures",
    description: "Implement in-order traversal of a binary tree recursively.",
    timeEstimate: "30 mins",
    points: 50,
    completed: false,
    rating: 4.9
  },
  {
    id: "5",
    title: "API Data Fetcher",
    difficulty: "Intermediate",
    category: "Async/Await",
    description: "Create an async function to fetch and parse JSON data from an API.",
    timeEstimate: "20 mins",
    points: 35,
    completed: false,
    rating: 4.5
  }
];

const difficultyColors = {
  Beginner: "bg-secondary text-secondary-foreground",
  Intermediate: "bg-accent text-accent-foreground",
  Advanced: "bg-destructive text-destructive-foreground"
};

interface ExerciseLibraryProps {
  onStartExercise?: (exercise: Exercise) => void;
}

export const ExerciseLibrary = ({ onStartExercise }: ExerciseLibraryProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All", ...Array.from(new Set(exercises.map(e => e.category)))];

  const filteredExercises = exercises.filter(exercise => {
    if (selectedDifficulty !== "All" && exercise.difficulty !== selectedDifficulty) return false;
    if (selectedCategory !== "All" && exercise.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exercise Library</h2>
          <p className="text-muted-foreground">Practice coding with hands-on exercises</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <div>
              <div className="font-semibold">145</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold">{exercises.filter(e => e.completed).length}/{exercises.length}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <div>
              <div className="font-semibold">2.5h</div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            <div>
              <div className="font-semibold">4.7</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Difficulty:</span>
          {difficulties.map(diff => (
            <Button
              key={diff}
              variant={selectedDifficulty === diff ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Category:</span>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map(exercise => (
          <Card key={exercise.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{exercise.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
                </div>
                {exercise.completed && (
                  <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs">
                <Badge className={difficultyColors[exercise.difficulty]}>
                  {exercise.difficulty}
                </Badge>
                <Badge variant="outline">{exercise.category}</Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {exercise.timeEstimate}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span>{exercise.points} pts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span>{exercise.rating}</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant={exercise.completed ? "success" : "hero"}
                  onClick={() => onStartExercise?.(exercise)}
                >
                  {exercise.completed ? "Review" : "Start"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};