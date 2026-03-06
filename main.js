import { heavyNumberCalculation } from "./heavy-number-calculation.js";

const workerButton = document.getElementById("web-worker-heavy-calculation-button");
const mainThreadButton = document.getElementById("main-thread-heavy-calculation-button");
const list = document.getElementById("list");
const fpsCounter = document.getElementById("fps-counter");
const totalEl = document.getElementById("total");

if (!window.Worker) {
    console.error("Your browser doesn't support web workers.");
} else {
    const myWorker = new Worker('worker.js', { type: 'module', name: 'Heavy calculation fancy worker' });
    
    workerButton.addEventListener("click", () => {
        totalEl.innerText = 'Total: calculando em segundo plano...';
        myWorker.postMessage(0);
    });
    
    myWorker.onmessage = (event) => {
        const wrokerResult = event.data;
        const total = wrokerResult;
        totalEl.innerText = `Total: ${total}`;
    };
};

mainThreadButton.addEventListener('click', () => {
    const result = heavyNumberCalculation(0);
    totalEl.innerText = `Total: ${result}`;
});

addEventListener("mousedown", () => {
    const item = document.createElement("li");
    item.innerText = "Item";
    list.appendChild(item);
});

function counter(initialCounter) {
    let number = initialCounter;
    fpsCounter.innerText = number;
    number += 1;
    if (true) {
        requestAnimationFrame(counter);
    };
};

counter(0);
