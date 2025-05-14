import { bubbleSortSteps } from './sortingAlgorithms.js';

const originalNumbers = [3, 7, 2, 9, 5, 8, 6, 1, 10, 4, 3, 7, 2, 8, 9];
let numbers = [...originalNumbers];
let currentAlgorithm = 'bubbleSort';
let steps = bubbleSortSteps([...numbers]);
let currentStep = 0;
let runInterval = null;

const graphContainer = document.getElementById('graph');
const descriptionContainer = document.getElementById('description');
const titleContainer = document.querySelector('h1');
const stepCounter = document.getElementById('stepCounter');

// Descriptions
const algorithmDescriptions = {
    bubbleSort: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process repeats until the list is sorted.`
};

function renderStep(stepIndex) {
    const values = steps[stepIndex];
    graphContainer.innerHTML = '';
    values.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / 10) * 100}%`;
        bar.title = num;
        graphContainer.appendChild(bar);
    });
    stepCounter.innerText = `Step: ${stepIndex + 1} / ${steps.length}`;
}

function updateDescriptionAndTitle(algorithm) {
    descriptionContainer.innerHTML = algorithmDescriptions[algorithm];
    titleContainer.innerHTML = `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Visualizer`;
    document.getElementById('algorithm').value = algorithm;
}

function setControlsDisabled(disabled) {
    document.querySelectorAll('button, select, input').forEach(el => el.disabled = disabled);
}

// Initial render
renderStep(currentStep);
updateDescriptionAndTitle(currentAlgorithm);

// Event listener for algorithm change
document.getElementById('algorithm').addEventListener('change', (event) => {
    currentAlgorithm = event.target.value;
    if (currentAlgorithm === 'bubbleSort') {
        steps = bubbleSortSteps([...numbers]);
        currentStep = 0;
        renderStep(currentStep);
        updateDescriptionAndTitle(currentAlgorithm);
    }
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    if (runInterval) {
        clearInterval(runInterval);
        runInterval = null;
    }

    numbers = [...originalNumbers];
    steps = bubbleSortSteps([...numbers]);
    currentStep = 0;
    renderStep(currentStep);
});

// Next step
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
});

// Previous step
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
});

// Run button
document.getElementById('runBtn').addEventListener('click', () => {
    if (runInterval) return;

    setControlsDisabled(true);
    runInterval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps.length) {
            clearInterval(runInterval);
            runInterval = null;
            setControlsDisabled(false);
            return;
        }
        renderStep(currentStep);
    }, 200);
});

// Custom numbers input
document.getElementById('inputBtn').addEventListener('click', () => {
    const input = document.getElementById('customNumbers').value.trim();
    const parts = input.split(',').map(num => num.trim());
    const parsedNumbers = [];

    for (let part of parts) {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 1 || num > 10) {
            alert("All numbers must be between 1 and 10. You entered an invalid value: " + part);
            return;
        }
        parsedNumbers.push(num);
    }

    if (parsedNumbers.length > 15) {
        alert("You can only enter up to 15 numbers.");
        return;
    }

    numbers = parsedNumbers;
    originalNumbers.splice(0, originalNumbers.length, ...parsedNumbers);
    steps = bubbleSortSteps([...numbers]);
    currentStep = 0;
    renderStep(currentStep);
    updateDescriptionAndTitle(currentAlgorithm);
});
