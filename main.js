const startButton = document.getElementById("start-button");
const totalEl = document.getElementById("total");

startButton.addEventListener("click", () => {
    const start = performance.now();
    let total = 0;

    while (performance.now() - start < 5000) {
        total += Math.random();
        total = Math.sqrt(total);
        total = Math.log(total + 5324);
    }

    totalEl.innerText = `Total: ${total}`;
});
