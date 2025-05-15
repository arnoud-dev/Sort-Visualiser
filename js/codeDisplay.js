// Get the reference to the algorithm elements
const algorithmSelect = document.getElementById("algorithm");
const codeBlock = document.getElementById("codeBlock");
const algorithmTitle = document.getElementById("algorithmTitle");
const lineNumbersContainer = document.querySelector(".code-line-numbers");

// Function to count lines and update line numbers
function updateLineNumbers(code) {
    const lines = code.split("\n");
    lineNumbersContainer.innerHTML = '';
    lines.forEach((_, index) => {
        lineNumbersContainer.innerHTML += `${index + 1}<br>`;
    });
}

// Stores code snippets for each algorithm
const codeSnippets = {
    bubbleSort: `<span class="keyword">const</span> <span class="variable">bubbleSort</span> = <span class="keyword">function</span>(<span class="parameter">arr</span>) {
    <span class="keyword">let</span> <span class="variable">n</span> = <span class="parameter">arr</span>.length;
    <span class="keyword">let</span> <span class="variable">swapped</span>;
    <span class="keyword">do</span> {
        <span class="variable">swapped</span> = <span class="literal">false</span>;
        <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="literal">0</span>; <span class="variable">i</span> &lt; <span class="variable">n</span> - <span class="literal">1</span>; <span class="variable">i</span>++) {
            <span class="keyword">if</span> (<span class="parameter">arr</span>[<span class="variable">i</span>] &gt; <span class="parameter">arr</span>[<span class="variable">i</span> + <span class="literal">1</span>]) {
                [<span class="parameter">arr</span>[<span class="variable">i</span>], <span class="parameter">arr</span>[<span class="variable">i</span> + <span class="literal">1</span>]] =
                [<span class="parameter">arr</span>[<span class="variable">i</span> + <span class="literal">1</span>], <span class="parameter">arr</span>[<span class="variable">i</span>]];
                <span class="variable">swapped</span> = <span class="literal">true</span>;
            }
        }
        <span class="variable">n</span>--;
    } <span class="keyword">while</span> (<span class="variable">swapped</span>);
    <span class="keyword">return</span> <span class="parameter">arr</span>;
}`
,
    selectionSort: `<span class="keyword">const</span> <span class="variable">selectionSort</span> = <span class="keyword">function</span>(<span class="parameter">arr</span>) {
    <span class="keyword">let</span> <span class="variable">n</span> = <span class="parameter">arr</span>.length;
    <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="literal">0</span>; <span class="variable">i</span> &lt; <span class="variable">n</span> - <span class="literal">1</span>; <span class="variable">i</span>++) {
        <span class="keyword">let</span> <span class="variable">minIndex</span> = <span class="variable">i</span>;
        <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">j</span> = <span class="variable">i</span> + <span class="literal">1</span>; <span class="variable">j</span> &lt; <span class="variable">n</span>; <span class="variable">j</span>++) {
            <span class="keyword">if</span> (<span class="parameter">arr</span>[<span class="variable">j</span>] &lt; <span class="parameter">arr</span>[<span class="variable">minIndex</span>]) {
                <span class="variable">minIndex</span> = <span class="variable">j</span>;
            }
        }
        [<span class="parameter">arr</span>[<span class="variable">i</span>], <span class="parameter">arr</span>[<span class="variable">minIndex</span>]] =
        [<span class="parameter">arr</span>[<span class="variable">minIndex</span>], <span class="parameter">arr</span>[<span class="variable">i</span>]];
    }
    <span class="keyword">return</span> <span class="parameter">arr</span>;
}`
};

// Event listener for algorithm selection
algorithmSelect.addEventListener("change", (e) => {
    const selectedAlgorithm = e.target.value;
    algorithmTitle.textContent = selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1);
    const code = codeSnippets[selectedAlgorithm];
    codeBlock.innerHTML = `<pre><code>${code}</code></pre>`;
    updateLineNumbers(code);
});

// Initialize with the default algorithm
document.addEventListener("DOMContentLoaded", () => {
    algorithmSelect.value = "bubbleSort";
    algorithmSelect.dispatchEvent(new Event("change"));
});
