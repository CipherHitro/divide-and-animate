import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ArrayBar from "@/components/ArrayBar";
import ControlPanel from "@/components/ControlPanel";
import StepDescription from "@/components/StepDescription";
import { generateQuickSortSteps, SortStep } from "@/utils/quickSortSteps";

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];

const QuickSort = () => {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [customArray, setCustomArray] = useState<string>("");
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const initializeSteps = useCallback(() => {
    const stepsData = generateQuickSortSteps(array);
    setSteps(stepsData);
    setCurrentStepIndex(0);
  }, [array]);

  useEffect(() => {
    initializeSteps();
  }, [initializeSteps]);

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, 1000 / speed);

    return () => clearTimeout(timeout);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handleStart = () => {
    if (customArray.trim()) {
      const parsed = customArray
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
      
      if (parsed.length > 0) {
        setArray(parsed);
        const newSteps = generateQuickSortSteps(parsed);
        setSteps(newSteps);
        setCurrentStepIndex(0);
      }
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setArray(customArray.trim() ? 
      customArray.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n)) : 
      DEFAULT_ARRAY
    );
  };

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const maxValue = Math.max(...(currentStep?.array || array));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
            Quick Sort Visualization
          </h1>
          <p className="text-muted-foreground">
            Watch how Quick Sort partitions the array around pivot elements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Visualization Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-strong border-border/50 animate-fade-in overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-end justify-center gap-2 h-[450px] px-4 pb-4">
                  {currentStep?.array.map((value, index) => (
                    <ArrayBar
                      key={`${value}-${index}`}
                      value={value}
                      height={value}
                      state={currentStep.states[index]}
                      maxValue={maxValue}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <StepDescription
              currentStep={currentStep?.description || ""}
              stepNumber={currentStepIndex + 1}
              totalSteps={steps.length}
            />
          </div>

          {/* Control Panel */}
          <div className="animate-slide-in">
            <Card className="shadow-soft border-border/50 sticky top-8">
              <CardContent className="p-6">
                <ControlPanel
                  isPlaying={isPlaying}
                  customArray={customArray}
                  speed={speed}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                  onStepForward={handleStepForward}
                  onStepBackward={handleStepBackward}
                  onCustomArrayChange={setCustomArray}
                  onSpeedChange={setSpeed}
                  disabled={steps.length === 0}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;
