const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

// Bubble Sort Algorithm
const bubbleSortSteps = function(arr) {
  let steps = [[...arr]];
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        if (!arraysAreEqual(arr, steps[steps.length - 1])) {
          steps.push([...arr]);
        }
      }
    }
  } while (swapped);
  return steps;
};

// Selection Sort Algorithm
const selectionSortSteps = function(arr) {
    let n = arr.length;
    const steps = [[...arr]];
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        if (!arraysAreEqual(arr, steps[steps.length - 1])) {
            steps.push([...arr]);
        }
    }
    return steps;
};
export {
  bubbleSortSteps,
  selectionSortSteps
};
