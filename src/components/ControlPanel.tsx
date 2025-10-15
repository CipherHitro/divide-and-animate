import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react";

interface ControlPanelProps {
  isPlaying: boolean;
  customArray: string;
  speed: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onCustomArrayChange: (value: string) => void;
  onSpeedChange: (value: number) => void;
  disabled?: boolean;
}

const ControlPanel = ({
  isPlaying,
  customArray,
  speed,
  onStart,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onCustomArrayChange,
  onSpeedChange,
  disabled = false,
}: ControlPanelProps) => {
  return (
    <div className="space-y-6">
      {/* Array Input */}
      <div className="space-y-2">
        <Label htmlFor="custom-array" className="text-sm font-semibold">
          Custom Array (comma-separated numbers)
        </Label>
        <Input
          id="custom-array"
          type="text"
          placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
          value={customArray}
          onChange={(e) => onCustomArrayChange(e.target.value)}
          disabled={isPlaying}
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to use default demo values
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2">
        {!isPlaying ? (
          <Button
            onClick={onStart}
            disabled={disabled}
            className="flex-1 min-w-[120px]"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="secondary"
            className="flex-1 min-w-[120px]"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Step Controls */}
      <div className="flex gap-2">
        <Button
          onClick={onStepBackward}
          disabled={isPlaying || disabled}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <SkipBack className="w-4 h-4 mr-2" />
          Step Back
        </Button>
        <Button
          onClick={onStepForward}
          disabled={isPlaying || disabled}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Step Forward
        </Button>
      </div>

      {/* Speed Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold">Animation Speed</Label>
          <span className="text-sm text-muted-foreground">{speed}x</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={0.5}
          max={3}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Slower</span>
          <span>Faster</span>
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-border">
        <Label className="text-sm font-semibold mb-3 block">Color Legend</Label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-state-default" />
            <span className="text-muted-foreground">Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-state-comparing" />
            <span className="text-muted-foreground">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-state-pivot" />
            <span className="text-muted-foreground">Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-state-sorted" />
            <span className="text-muted-foreground">Sorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-state-merging" />
            <span className="text-muted-foreground">Merging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
