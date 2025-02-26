document.getElementById("submitButton").addEventListener("click", () => {
    const number = Number(document.getElementById("number").value);

    if (number <= 1) {
        alert("Number must be greater than 1");
        return;
    }

    try {
        findLongestSequence(number);
    } catch (error) {
        alert(error.message);
    }

});

const collatz = (num) => {
    const number = num;

    return number % 2 == 0 ? number / 2 : number * 3 + 1;
}

const collatzSequence = (num) => {
    let number = num;

    let sequence = [number];

    while (number !== 1) {
        number = collatz(number);
        sequence.push(number);
    }
    return sequence;
}

function findLongestSequence(num) {
    const number = num;
    let stepsLength = 0;
    let longestStepsNumber = 0;

    for (let i = 1; i < number; i++) {
        let sequence = collatzSequence(i);

        if (sequence.length > stepsLength) {
            stepsLength = sequence.length;
            longestStepsNumber = i;
        }
    }

    const longestSequence = collatzSequence(longestStepsNumber);

    document.getElementById("result").innerHTML = `
                <span>${longestStepsNumber} is the longest steps number less than ${number} and it has ${stepsLength - 1} steps length.</span>
                <span>Sequence:</span>
                <p class="sequence">${longestSequence.join(" → ")}</p>
            `;
}










