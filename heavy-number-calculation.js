function heavyNumberCalculation(number, secondsToExecute = 5) {
    const milliseconds = secondsToExecute * 1000;
    const start = performance.now();
    while (performance.now() - start < milliseconds) {
        number += Math.random();
        number += Math.sqrt(number);
        number += Math.log(number + 5324);
    };
    console.log(number)
    return number;
};

export { 
    heavyNumberCalculation
};
