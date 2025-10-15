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

  const heightPercentage = (height / maxValue) * 100;

  return (
    <div className="flex flex-col items-center justify-end gap-3 flex-1 min-w-0 transition-all duration-300">
      <div
        className={`w-full rounded-t-md ${stateColors[state]} transition-all duration-500 ease-out shadow-lg relative group`}
        style={{
          height: `${Math.max(heightPercentage, 8)}%`,
          minHeight: '30px',
        }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-md border border-border/50">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ArrayBar;
