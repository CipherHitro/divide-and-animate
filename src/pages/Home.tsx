import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Split, Shuffle } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Algorithm Visualizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore and understand Divide and Conquer algorithms through interactive visualizations
          </p>
        </div>

        {/* Intro Section */}
        <Card className="mb-12 shadow-soft border-border/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">What is Divide and Conquer?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Divide and Conquer</strong> is a powerful algorithmic paradigm that breaks down 
              complex problems into smaller, more manageable sub-problems. The strategy follows three key steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li><strong className="text-foreground">Divide:</strong> Break the problem into smaller sub-problems of the same type</li>
              <li><strong className="text-foreground">Conquer:</strong> Solve the sub-problems recursively</li>
              <li><strong className="text-foreground">Combine:</strong> Merge the solutions to create the solution to the original problem</li>
            </ol>
            <p>
              This approach is particularly effective for sorting algorithms like Merge Sort and Quick Sort, 
              which efficiently organize data by repeatedly dividing and conquering.
            </p>
          </CardContent>
        </Card>

        {/* Algorithm Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link to="/merge-sort" className="group">
            <Card className="h-full shadow-soft hover:shadow-strong transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer animate-scale-up">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Split className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  Merge Sort
                </CardTitle>
                <CardDescription className="text-base">
                  A stable, comparison-based sorting algorithm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Merge Sort divides the array into two halves, recursively sorts them, and then merges 
                  the sorted halves back together. It guarantees O(n log n) time complexity.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Complexity:</span>
                    <span className="font-mono font-semibold text-foreground">O(n log n)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Space Complexity:</span>
                    <span className="font-mono font-semibold text-foreground">O(n)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stability:</span>
                    <span className="font-semibold text-state-sorted">Stable</span>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  Visualize Merge Sort
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/quick-sort" className="group">
            <Card className="h-full shadow-soft hover:shadow-strong transition-all duration-300 border-border/50 hover:border-accent/50 cursor-pointer animate-scale-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-4">
                  <Shuffle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                  Quick Sort
                </CardTitle>
                <CardDescription className="text-base">
                  An efficient, in-place sorting algorithm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Quick Sort selects a 'pivot' element and partitions the array around it, 
                  placing smaller elements before and larger elements after. It then recursively sorts the partitions.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Complexity:</span>
                    <span className="font-mono font-semibold text-foreground">O(n log n) avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Space Complexity:</span>
                    <span className="font-mono font-semibold text-foreground">O(log n)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stability:</span>
                    <span className="font-semibold text-muted-foreground">Unstable</span>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  Visualize Quick Sort
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Instructions */}
        <Card className="shadow-soft border-border/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-xl">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</span>
              <p>Choose an algorithm to visualize by clicking on one of the cards above</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</span>
              <p>Use the default demo array or enter your own custom values (numbers separated by commas)</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</span>
              <p>Click "Start" to begin the visualization. Watch as the algorithm divides and conquers!</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</span>
              <p>Use the control buttons to pause, resume, reset, or step through the algorithm manually</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">5</span>
              <p>Adjust the animation speed to your preference using the speed slider</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
