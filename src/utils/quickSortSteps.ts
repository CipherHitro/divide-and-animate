export interface SortStep {
  array: number[];
  states: ('default' | 'comparing' | 'pivot' | 'sorted' | 'merging')[];
  description: string;
  highlightIndices?: number[];
}

export const generateQuickSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const n = arr.length;

  // Initial state
  steps.push({
    array: [...arr],
    states: Array(n).fill('default'),
    description: `Initial unsorted array: [${arr.join(', ')}]. Quick Sort will select pivot elements and partition the array around them.`,
  });

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    
    steps.push({
      array: [...arr],
      states: arr.map((_, i) => {
        if (i === high) return 'pivot';
        if (i >= low && i < high) return 'comparing';
        return 'default';
      }),
      description: `Selected pivot: ${pivot} (at index ${high}). Now we'll partition the array so all elements smaller than ${pivot} are on the left, and larger elements are on the right.`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        states: arr.map((_, idx) => {
          if (idx === high) return 'pivot';
          if (idx === j) return 'comparing';
          if (idx > low && idx <= i) return 'sorted';
          return 'default';
        }),
        description: `Comparing ${arr[j]} with pivot ${pivot}. ${arr[j] < pivot ? `${arr[j]} is smaller than pivot, moving to left partition.` : `${arr[j]} is not smaller, stays in right partition.`}`,
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
        steps.push({
          array: [...arr],
          states: arr.map((_, idx) => {
            if (idx === high) return 'pivot';
            if (idx === i || idx === j) return 'comparing';
            return 'default';
          }),
          description: `Swapped ${arr[j]} and ${arr[i]}. Elements less than pivot are now grouped on the left.`,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    steps.push({
      array: [...arr],
      states: arr.map((_, idx) => {
        if (idx === i + 1) return 'sorted';
        return 'default';
      }),
      description: `Placed pivot ${pivot} at its correct position (index ${i + 1}). All elements to the left are smaller, all elements to the right are larger.`,
    });

    return i + 1;
  };

  const quickSort = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high);

      steps.push({
        array: [...arr],
        states: arr.map((_, i) => {
          if (i === pi) return 'sorted';
          if (i >= low && i < pi) return 'comparing';
          if (i > pi && i <= high) return 'comparing';
          return 'default';
        }),
        description: `Pivot ${arr[pi]} is in its final position. Now recursively sorting left partition [${arr.slice(low, pi).join(', ')}] and right partition [${arr.slice(pi + 1, high + 1).join(', ')}].`,
      });

      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    } else if (low === high) {
      steps.push({
        array: [...arr],
        states: arr.map((_, i) => {
          if (i === low) return 'sorted';
          return 'default';
        }),
        description: `Single element ${arr[low]} at index ${low} is already sorted.`,
      });
    }
  };

  const arrayCopy = [...arr];
  quickSort(arrayCopy, 0, n - 1);

  // Final sorted state
  steps.push({
    array: arrayCopy,
    states: Array(n).fill('sorted'),
    description: `Array is now completely sorted: [${arrayCopy.join(', ')}]. Quick Sort has successfully organized all elements in ascending order!`,
  });

  return steps;
};
