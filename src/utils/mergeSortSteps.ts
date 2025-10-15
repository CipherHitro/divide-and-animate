export interface SortStep {
  array: number[];
  states: ('default' | 'comparing' | 'pivot' | 'sorted' | 'merging')[];
  description: string;
  highlightIndices?: number[];
}

export const generateMergeSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const n = arr.length;

  // Initial state
  steps.push({
    array: [...arr],
    states: Array(n).fill('default'),
    description: `Initial unsorted array: [${arr.join(', ')}]. We'll use Merge Sort to divide the array into smaller subarrays, sort them, and merge them back together.`,
  });

  const merge = (arr: number[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    steps.push({
      array: [...arr],
      states: arr.map((_, i) => {
        if (i >= left && i <= right) return 'merging';
        return 'default';
      }),
      description: `Merging subarrays: [${leftArr.join(', ')}] and [${rightArr.join(', ')}]. We'll compare elements from both subarrays and place them in sorted order.`,
    });

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        states: arr.map((_, idx) => {
          if (idx === left + i || idx === mid + 1 + j) return 'comparing';
          if (idx >= left && idx < k) return 'sorted';
          if (idx >= left && idx <= right) return 'merging';
          return 'default';
        }),
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}. ${leftArr[i] <= rightArr[j] ? leftArr[i] : rightArr[j]} is smaller, so we place it next.`,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    steps.push({
      array: [...arr],
      states: arr.map((_, i) => {
        if (i >= left && i <= right) return 'sorted';
        return 'default';
      }),
      description: `Merged subarray [${arr.slice(left, right + 1).join(', ')}] is now sorted. The elements from both subarrays have been combined in ascending order.`,
    });
  };

  const mergeSort = (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        array: [...arr],
        states: arr.map((_, i) => {
          if (i >= left && i <= right) return 'comparing';
          return 'default';
        }),
        description: `Dividing array into two halves: [${arr.slice(left, mid + 1).join(', ')}] and [${arr.slice(mid + 1, right + 1).join(', ')}]. This is the "divide" step of divide and conquer.`,
      });

      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  };

  const arrayCopy = [...arr];
  mergeSort(arrayCopy, 0, n - 1);

  // Final sorted state
  steps.push({
    array: arrayCopy,
    states: Array(n).fill('sorted'),
    description: `Array is now completely sorted: [${arrayCopy.join(', ')}]. Merge Sort has successfully organized all elements in ascending order with O(n log n) time complexity!`,
  });

  return steps;
};
