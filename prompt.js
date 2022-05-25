// "use strict";

// const fs = require("fs");
// const readline = require("readline");
// const fileName = process.argv[2];
// const fileTemplate = /^-?\d+\.?\d*\s-?\d+\.?\d*\s-?\d+\.?\d*\n$/;
// const numberTemplate = /^-?\d+\.?\d*$/;
// const question = (rl, query) =>
//   new Promise((resolve) => {
//     rl.question(query, (answer) => {
//       resolve(answer);
//     });
//   });

// const findRoots = (a, b, c) => {
//   const d = b * b - 4 * a * c;
//   if (d < 0) return [];
//   if (d === 0) {
//     const x = (-1 * b) / (2 * a);
//     return [x];
//   } else {
//     const x1 = (-1 * b + Math.sqrt(d)) / (2 * a);
//     const x2 = (-1 * b - Math.sqrt(d)) / (2 * a);
//     return [x1, x2];
//   }
// };

// const solveEquation = (a, b, c) => {
//   if (a === 0) throw new Error("a cannot be 0");
//   const fixed = [a, b, c].map((val) => val.toFixed(1));
//   const eq = `(${fixed[0]}) x^2 + (${fixed[1]}) x + (${fixed[2]}) = 0`;
//   console.log("Equation is: " + eq);
//   const roots = findRoots(a, b, c);
//   console.log(`There are ${roots.length} roots`);
//   roots.forEach((value, index) => {
//     console.log(`x${index + 1} = ${value.toFixed(1)}`);
//   });
// };

// const readNumFromRl = async (rl, strNum) => {
//   let n;
//   do {
//     if (n) console.log(`Expected a valid real number, got "${n}" instead`);
//     n = await question(rl, `${strNum} = `);
//   } while (!numberTemplate.test(n));
//   return parseFloat(n);
// };

// if (fileName) {
//   fs.readFile(fileName, (err, data) => {
//     if (err) {
//       if (err.code === "ENOENT")
//         throw new Error(`file ${fileName} does not exist`);
//       throw err;
//     }
//     const file = data.toString();
//     if (!fileTemplate.test(file)) throw new Error("invalid file format");
//     const coefs = file
//       .trim()
//       .split(" ")
//       .map((value) => parseFloat(value));
//     solveEquation(...coefs);
//   });
// } else {
//   const { stdin: input, stdout: output } = process;
//   const rl = readline.createInterface({ input, output });
//   const readNum = readNumFromRl.bind(null, rl);
//   (async () => {
//     let a;
//     do {
//       if (a === 0) console.log("a cannot be 0");
//       a = await readNum("a");
//     } while (a === 0);
//     const b = await readNum("b");
//     const c = await readNum("c");
//     solveEquation(a, b, c);
//     rl.close();
//   })();
// }






































"use strict";

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  let txtRegex = new RegExp(".+.txt");
  let txtFile;
  for (let el of process.argv) {
    if (txtRegex.test(el)) {
      txtFile = el;
    }
  }
  if (txtFile) {
    notInteractiveFunc(txtFile);
  } else {
    interactiveFunc();
  }
};

const interactiveFunc = async () => {
  console.log("Quadratic equation instance: ax^2 + bx + c = 0");
  const a = await questionFunc("a");
  const b = await questionFunc("b");
  const c = await questionFunc("c");
  console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
  const roots = solveQuadraticEquation(a, b, c);
  console.log(roots);
  showMenu();
};

const notInteractiveFunc = async (filename) => {
  console.log("Quadratic equation instance: ax^2 + bx + c = 0");
  if (fs.existsSync(filename)) {
    const regex = /-*\d+[.\d+]* -*\d+[.\d+]* -*\d+[.\d+]*/;
    const fileContent = fs.readFileSync(filename, "utf-8");
    if (regex.test(fileContent)) {
      const numbersStr = fileContent.match(regex)[0];
      const numbersArr = numbersStr.split(" ");
      const [a, b, c] = [
        parseFloat(numbersArr[0]),
        parseFloat(numbersArr[1]),
        parseFloat(numbersArr[2]),
      ];
      if (a == 0) {
        console.log("a can't be equal 0\n");
        return;
      }
      console.log(`
a =\x1b[32m ${a} \x1b[37m
b =\x1b[32m ${b} \x1b[37m
c =\x1b[32m ${c} \x1b[37m`);
      console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
      const roots = solveQuadraticEquation(a, b, c);
      console.log(roots);
    }
  } else {
    console.log("There is no such file in this directory");
  }
  process.exit();
};

const questionFunc = async (name) => {
  return new Promise((resolve) => {
    rl.question(
      `Write ${name} (use . to input float number)\n`,
      async function (inp) {
        let res = parseFloat(inp);
        console.log(`${name} =\x1b[32m ${inp} \x1b[37m`);
        if (isNaN(res)) {
          console.log(
            `Error. Expected a valid real number, got ${inp} instead. Please write number...\n`
          );
          resolve(await questionFunc(name));
        } else {
          if (name == "a" && res == 0) {
            console.log("a can't be equal 0. Please write number again...\n");
            resolve(await questionFunc(name));
          }
          resolve(res);
        }
      }
    );
  });
};

const solveQuadraticEquation = (a, b, c) => {
  const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  if (isNaN(result)) return "There are 0 roots\n";
  if (result == result2) return `There is 1 root\nx1 = ${result}\n`;
  return `There are 2 roots
x1 = ${result}
x2 = ${result2}
`;
};

showMenu();