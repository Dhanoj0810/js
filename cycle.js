// YOU CAN'T GIVE 0'S IN FIRST AND LAST IN numberForCycle
let numberForCycle = 123;
const numberOfCycles = 15;
let reverseNumberForCycle = 0;

while (numberForCycle > 0) {
    reverseNumberForCycle = (reverseNumberForCycle * 10) + (numberForCycle % 10);
    numberForCycle = (numberForCycle - (numberForCycle % 10)) / 10;
}

let cycle = 0;
let digitsToAddCycle = reverseNumberForCycle;

for (let itrationDone = 0; itrationDone < numberOfCycles; itrationDone++) {
    cycle = (cycle * 10) + (digitsToAddCycle % 10);
    digitsToAddCycle = (digitsToAddCycle - (digitsToAddCycle % 10)) / 10;
    if (digitsToAddCycle < 1) {
        digitsToAddCycle = reverseNumberForCycle;
    }
}

if (numberOfCycles > 0){
    console.log(cycle);
}
