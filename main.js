'use strict'

const readline = require("readline");
const fs = require("fs");

const solution = (a, b, c) => {
    console.log(`Equation is: (${a})*x^2 + (${b})*x + (${c}) = 0`)
    let x;
    let equal = a*Math.pow(x, 2) + b*x + c;
    let D = Math.pow(b, 2)- 4*a*c
    if (D>0) {
        let x1 = (-1*b + Math.sqrt(D))/2*a;
        let x2 = (-1*b - Math.sqrt(D))/2*a;
        console.log('There are 2 roots')
        console.log(`x1 = ${x1}\nx2 = ${x2}\n`)
    } else if (D=0) {
        x = -1 *(b/(2*a))
        console.log('There is 1 root')
        console.log(`x = ${x}\n`)
    } else {
        console.log('There are 0 roots\n')
    }

}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
const question = async (name) => {
    return new Promise((resolve) => {
        rl.question(
        `Input ${name}: `,
        async function (input) {
            let res = parseFloat(input);
            if (isNaN(res)) {
                console.log(
                `Error. Expected a valid real number, got ${input} instead. Please write number...\n`
                );
                resolve(await question(name));
            } else {
                if (name == "a" && res == 0) {
                    console.log("a can't be equal 0. Please write number again...\n");
                    resolve(await question(name));
                }
                resolve(res);
            }
          }
        );
      });
};

const interactive = async () => {
    const a = await question("a");
    const b = await question("b");
    const c = await question("c");
    solution(a,b,c);
    console.log('To exit, press \'CTRL + C\' OR You can solve quadratic equation one more time:')
    interactive();
}

const notInteractive = async (filename) => {
    if (fs.existsSync(filename)) {
        console.log(`Numbers input from ${filename}`)
        const fileContent = fs.readFileSync(filename, "utf-8");
            const numbers = fileContent.split(" ");
            const [a, b, c] = [
                parseFloat(numbers[0]),
                parseFloat(numbers[1]),
                parseFloat(numbers[2]),
            ];
            if (a == 0) {
                console.log("a can't be equal 0\n");
                return;
            }
            console.log(`a = ${a}\nb = ${b}\nc = ${c}`);
            solution(a, b, c);

    } else {
        console.log("There is no such file in this directory");
    }
    process.exit();
};


//interactive();
notInteractive('text.txt');