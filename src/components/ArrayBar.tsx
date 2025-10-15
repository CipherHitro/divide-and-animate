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
    <div className="flex flex-col items-center justify-end gap-2 flex-1 min-w-0">
      <span className="text-xs font-semibold text-foreground">{value}</span>
      <div
        className={`w-full rounded-t-lg ${stateColors[state]} transition-all duration-300 ease-in-out shadow-sm`}
        style={{
          height: `${Math.max(heightPercentage, 10)}%`,
          minHeight: '20px',
        }}
      />
    </div>
  );
};

export default ArrayBar;
