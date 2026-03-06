const startButton = document.getElementById("start-button");
const list = document.getElementById("list");
const fpsCounter = document.getElementById("fps-counter");
const totalEl = document.getElementById("total");

if (!window.Worker) {
    console.error("Your browser doesn't support web workers.");
} else {
    const myWorker = new Worker('worker.js', { name: 'Heavy calculation fancy worker' });
    
    startButton.addEventListener("click", () => {
        totalEl.innerText = 'Total: calculando em segundo plano...';
        myWorker.postMessage(0);
    });
    
    myWorker.onmessage = (event) => {
        const wrokerResult = event.data;
        const total = wrokerResult;
        totalEl.innerText = `Total: ${total}`;
    };
};

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
