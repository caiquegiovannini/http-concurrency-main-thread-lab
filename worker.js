onmessage = (event) => {
    let number = event.data;
    const start = performance.now();
    while (performance.now() - start < 5000) {
        number += Math.random();
        number += Math.sqrt(number);
        number += Math.log(number + 5324);
    };
    postMessage(number);
};
