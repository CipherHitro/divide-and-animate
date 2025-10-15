interface ArrayBarProps {
  value: number;
  height: number;
  state: 'default' | 'comparing' | 'pivot' | 'sorted' | 'merging';
  maxValue: number;
}

const ArrayBar = ({ value, height, state, maxValue }: ArrayBarProps) => {
  const stateColors = {
    default: 'bg-state-default',
    comparing: 'bg-state-comparing',
    pivot: 'bg-state-pivot',
    sorted: 'bg-state-sorted',
    merging: 'bg-state-merging',
  };

  // Calculate proportional height - the bar height directly represents the value
  // Max value gets full container height (400px), others are proportional
  const barHeight = (height / maxValue) * 400;

  return (
    <div className="flex flex-col items-center justify-end flex-1 min-w-0 transition-all duration-300">
      <div
        className={`w-full rounded-t-md ${stateColors[state]} transition-all duration-500 ease-out shadow-lg relative`}
        style={{
          height: `${barHeight}px`,
        }}
      >
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md border border-border/50 whitespace-nowrap">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ArrayBar;
