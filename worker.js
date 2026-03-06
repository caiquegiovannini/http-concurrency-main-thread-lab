import { heavyNumberCalculation } from './heavy-number-calculation.js';

onmessage = (event) => {
    const numberToCalculate = event.data;
    const calculationResult = heavyNumberCalculation(numberToCalculate);
    postMessage(calculationResult);
};
