import { 
    bubbleSortSteps,
    selectionSortSteps
} from './sortingAlgorithms.js';

const originalNumbers = [3, 5, 8, 6, 1, 10, 4, 3];
let numbers = [...originalNumbers];
let currentAlgorithm = 'bubbleSort';
let steps = [];
let currentStep = 0;
let runInterval = null;

const graphContainer = document.getElementById('graph');
const descriptionContainer = document.getElementById('description');
const titleContainer = document.getElementById('algorithmTitle');
const stepCounter = document.getElementById('stepCounter');

// Descriptions
const algorithmDescriptions = {
    bubbleSort: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent
    elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the
    list is sorted.`,
    
    selectionSort: `Selection Sort is a simple comparison-based algorithm. It divides the list into two parts: 
    a sorted and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist 
    and swaps it with the leftmost unsorted element.`,
};

function initializeSteps() {
    if (runInterval) {
        clearInterval(runInterval);
        runInterval = null;
    }

    if (currentAlgorithm === 'bubbleSort') {
        steps = bubbleSortSteps([...numbers]);
    } else if (currentAlgorithm === 'selectionSort') {
        steps = selectionSortSteps([...numbers]);
    }

    console.log('Steps generated:', steps);

    currentStep = 0;
    renderStep(currentStep);
    updateDescriptionAndTitle(currentAlgorithm);
    setControlsDisabled(false);
    document.getElementById('runBtn').innerText = 'Run';
}


function renderStep(stepIndex) {
    const values = steps[stepIndex];
    graphContainer.innerHTML = '';
    values.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / 10) * 95 }%`;
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

initializeSteps();

document.getElementById('algorithm').addEventListener('change', (event) => {
    currentAlgorithm = event.target.value;
    initializeSteps();
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    initializeSteps();
    numbers = [...originalNumbers];
});

// Next step
document.getElementById('nextBtn').addEventListener('click', () => {
    if (runInterval) return;
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
});

// Previous step
document.getElementById('prevBtn').addEventListener('click', () => {
    if (runInterval) return;
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
});

// Run button
document.getElementById('runBtn').addEventListener('click', () => {
    if (runInterval) {
        clearInterval(runInterval);
        runInterval = null;
        setControlsDisabled(false);
        document.getElementById('runBtn').innerText = 'Run';
    } else {
        setControlsDisabled(true);
        document.getElementById('runBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('runBtn').innerText = 'Pause';
        runInterval = setInterval(() => {
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(runInterval);
                runInterval = null;
                setControlsDisabled(false);
                document.getElementById('runBtn').innerText = 'Run';
                return;
            }
            renderStep(currentStep);
        }, 200);
    }
});

// Custom numbers input
document.getElementById('inputBtn').addEventListener('click', () => {
    if (runInterval) {
        clearInterval(runInterval);
        runInterval = null;
        setControlsDisabled(false);
        document.getElementById('runBtn').innerText = 'Run';
    }
    const input = document.getElementById('customNumbers').value.trim();
    const parts = input.split(',').map(num => num.trim()).filter(num => num !== '');
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
    initializeSteps();
});
