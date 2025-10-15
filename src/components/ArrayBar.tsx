import { motion } from 'framer-motion';

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
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        layout: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      className="flex flex-col items-center justify-end flex-1 min-w-0"
    >
      <motion.div
        layout
        className={`w-full rounded-t-md ${stateColors[state]} shadow-lg relative`}
        style={{
          height: `${barHeight}px`,
        }}
        animate={{
          backgroundColor: state === 'comparing' ? 'hsl(var(--state-comparing))' :
                          state === 'pivot' ? 'hsl(var(--state-pivot))' :
                          state === 'sorted' ? 'hsl(var(--state-sorted))' :
                          state === 'merging' ? 'hsl(var(--state-merging))' :
                          'hsl(var(--state-default))'
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div 
          layout
          className="absolute -top-9 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md border border-border/50 whitespace-nowrap"
        >
          {value}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ArrayBar;
