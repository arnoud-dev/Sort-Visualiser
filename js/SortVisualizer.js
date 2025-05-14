const graphContainer = document.getElementById("graph");
const stepCounter = document.getElementById("stepCounter");

const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

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
                if (!arraysAreEqual(arr, steps[steps.length - 1]))
                    steps.push([...arr]);
            }
        }
        n--;
    } while (swapped);
    return steps;
};

const originalNumbers = [3, 9, 4, 1, 2, 8, 3, 5];
let steps = bubbleSortSteps([...originalNumbers]);
let currentStep = 0;
let runInterval = null;

function renderStep(stepIndex) {
    const values = steps[stepIndex];
    graphContainer.innerHTML = '';
    values.forEach(num => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(num / 10) * 100}%`;
        bar.title = num;
        graphContainer.appendChild(bar);
    });
    stepCounter.innerText = `Step: ${stepIndex + 1} / ${steps.length}`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep(currentStep);
  }
});

document.getElementById("runBtn").addEventListener("click", () => {
  if (runInterval) return;
  runInterval = setInterval(() => {
    currentStep++;
    if (currentStep >= steps.length) {
      clearInterval(runInterval);
      runInterval = null;
      return;
    }
    renderStep(currentStep);
  }, 200);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (runInterval) {
    clearInterval(runInterval);
    runInterval = null;
  }
  currentStep = 0;
  steps = bubbleSortSteps([...originalNumbers]);
  renderStep(currentStep);
});


renderStep(0);
