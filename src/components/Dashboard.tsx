import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Code, 
  Trophy, 
  Clock, 
  Target, 
  BookOpen, 
  Zap, 
  Calendar,
  ChevronRight,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-coding.jpg";

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const recentExercises = [
    { name: "Array Sum Calculator", status: "Completed", points: 20 },
    { name: "Hello World Function", status: "Completed", points: 10 },
    { name: "Palindrome Checker", status: "In Progress", points: 30 }
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first exercise", earned: true },
    { title: "Array Master", description: "Complete 5 array exercises", earned: true },
    { title: "Speed Coder", description: "Complete an exercise in under 5 minutes", earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome back, Developer!
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Continue your coding journey with personalized exercises, real-time feedback, and interactive tutorials.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" onClick={() => onNavigate?.("exercises")}>
                <Target className="w-5 h-5 mr-2" />
                Start Coding
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate?.("tutorials")}>
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Tutorials
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-secondary">73%</div>
              <div className="text-sm text-muted-foreground">Daily Goal</div>
            </div>
            <Target className="w-8 h-8 text-secondary" />
          </div>
          <Progress value={73} className="mt-3" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">145</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <Trophy className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Exercises Completed</div>
            </div>
            <Code className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <Zap className="w-8 h-8 text-accent" />
          </div>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Exercises</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("exercises")}>
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentExercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium">{exercise.name}</div>
                  <div className="text-sm text-muted-foreground">{exercise.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={exercise.status === "Completed" ? "secondary" : "outline"}>
                    +{exercise.points} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? 'bg-secondary/10' : 'bg-muted/30'}`}>
                <Trophy className={`w-6 h-6 ${achievement.earned ? 'text-secondary' : 'text-muted-foreground'}`} />
                <div className="flex-1">
                  <div className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
                {achievement.earned && (
                  <Star className="w-5 h-5 text-accent fill-current" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning Path */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Learning Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Code className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-semibold mb-2">JavaScript Fundamentals</h4>
            <p className="text-sm text-muted-foreground mb-3">Master the basics of JavaScript programming</p>
            <Progress value={80} className="mb-2" />
            <div className="text-xs text-muted-foreground">8/10 exercises completed</div>
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
            <BookOpen className="w-8 h-8 text-secondary mb-3" />
            <h4 className="font-semibold mb-2">Data Structures</h4>
            <p className="text-sm text-muted-foreground mb-3">Learn arrays, objects, and advanced structures</p>
            <Progress value={40} className="mb-2" />
            <div className="text-xs text-muted-foreground">4/10 exercises completed</div>
          </div>
          
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <TrendingUp className="w-8 h-8 text-accent mb-3" />
            <h4 className="font-semibold mb-2">Algorithms</h4>
            <p className="text-sm text-muted-foreground mb-3">Practice sorting, searching, and optimization</p>
            <Progress value={10} className="mb-2" />
            <div className="text-xs text-muted-foreground">1/10 exercises completed</div>
          </div>
        </div>
      </Card>
    </div>
  );
};