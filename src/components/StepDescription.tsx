import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StepDescriptionProps {
  currentStep: string;
  stepNumber: number;
  totalSteps: number;
}

const StepDescription = ({ currentStep, stepNumber, totalSteps }: StepDescriptionProps) => {
  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Current Step</span>
          <span className="text-sm font-normal text-muted-foreground">
            {stepNumber} / {totalSteps}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              {currentStep || "Click Start to begin the visualization"}
            </p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StepDescription;
