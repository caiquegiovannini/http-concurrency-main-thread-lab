const parallelRequestsButton = document.getElementById('make-parallel-requests');
const sequentialRequestsButton = document.getElementById('make-sequential-requests');
const batchesRequestsButton = document.getElementById('make-batch-requests');
const abortButton = document.getElementById('abort-request');

let controller;

async function fetchUrl(url) {
    return fetch(url);
};

async function runWithLimitV1(tasks = [], limit) {
    const results = [];
    const running = [];

    for (const task of tasks) {
        const promise = task().then(result => {
            running.splice(running.indexOf(promise), 1);
            return result;
        });
        results.push(promise);
        running.push(promise);
        if(running.length >= limit) {
            await Promise.race(running);
        }
    }

    return Promise.all(results);
};

async function runWithLimitV2(tasks, limit) {
    const results = [];
    let index = 0;

    async function worker() {
        while (index < tasks.length) {
            controller = new AbortController();
            const currentIndex = index++;
            console.log("running index: ", currentIndex);


            try {
                const result = await tasks[currentIndex]();
                results[currentIndex] = result;
            } catch (e) {
                if (e.name === "AbortError") {
                    console.warn(`Request #${currentIndex+1} aborted`);
                    results[currentIndex] = "aborted";
                } else {
                    console.error(`Request ${currentIndex+1} error: ${e}`);
                    results[currentIndex] = "error";
                }
            }
        }
    }

    const workers = [];
    for (let i = 0;i < limit; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    return results;
};

parallelRequestsButton.addEventListener('click', async () => {
    const startTime = performance.now();

    let promises = [];
    for (let i = 0; i < 20; i++) {
        const promise = fetchUrl('https://httpbin.org/delay/1');
        promises.push(promise);
    };

    Promise.all(promises)
        .then(() => {
            const endTime = performance.now();
            console.log(`Tempo total = ${endTime - startTime}`);
            // tempo total = 1.5 - 2.5 seg
        })
        .then(() => {
            const log = performance.getEntriesByType("resource")
                .filter(entry => entry.name == 'https://httpbin.org/delay/1')
                .map(entry => ({
                    name: entry.name,
                    "keep-alive": entry.connectStart === 0 ? "Yes" : "No",
                    connectStart: entry.connectStart,
                    connectEnd: entry.connectEnd,
                    duration: entry.duration
                }));
            console.table(log);
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
        promises.push(() => fetch('https://httpbin.org/delay/1', {signal: controller.signal}));
    };

    // await runWithLimitV1(promises, 5);
    await runWithLimitV2(promises, 5);

    const endTime = performance.now();

    console.log(`Tempo total = ${endTime - startTime}`);
    // tempo total = 5 seg

    const log = performance.getEntriesByType("resource")
        .filter(entry => entry.name == 'https://httpbin.org/delay/1')
        .map(entry => ({
            name: entry.name,
            connectStart: entry.connectStart,
            connectEnd: entry.connectEnd,
            duration: entry.duration
        }));
    console.table(log);
});

abortButton.addEventListener('click', async () => {
    controller.abort();
});