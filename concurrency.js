const parallelRequestsButton = document.getElementById('make-parallel-requests');
const sequentialRequestsButton = document.getElementById('make-sequential-requests');
const batchesRequestsButton = document.getElementById('make-batch-requests');

async function fetchUrl(url) {
    return fetch(url);
};

function runWithLimit(tasks = [], limit) {
    tasks.slice(0, 4);
   console.log(tasks.length())
};

parallelRequestsButton.addEventListener('click', async () => {
    const startTime = performance.now();

    let promises = [];
    for (let i = 0; i < 20; i++) {
        const promise = fetchUrl('https://httpbin.org/delay/1');
        promises.push(promise);
    };

    Promise.all(promises)
        .then(values => console.log(values))
        .then(() => {
            const endTime = performance.now();
            console.log(`Tempo total = ${endTime - startTime}`);
            // tempo total = 1.5 seg
        });
});

sequentialRequestsButton.addEventListener('click', async () => {
    const startTime = performance.now();

    for (let i = 0; i < 20; i++) {
        await fetchUrl('https://httpbin.org/delay/1');
    };

    const endTime = performance.now();
    console.log(`Tempo total = ${endTime - startTime}`);
    // tempo total = 25 seg
});

batchesRequestsButton.addEventListener('click', async () => {
    const startTime = performance.now();

    let promises = [];
    for (let i = 0; i < 20; i++) {
        const promise = fetchUrl('https://httpbin.org/delay/1');
        promises.push(() => promise());
    };

    runWithLimit(promises, 5);
});