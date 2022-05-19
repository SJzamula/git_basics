'use strict'

const solution = (a, b, c) => {
    if (a != 0) {
        console.log(`a = ${a}\nb = ${b}\nc = ${c}`)
        console.log(`Equation is: (${a})*x^2 + (${b})*x + (${c}) = 0`)
        let x;
        let equal = a*Math.pow(x, 2) + b*x + c;
        let D = Math.pow(b, 2)- 4*a*c
        if (D>0) {
            let x1 = (-1*b + Math.sqrt(D))/2*a;
            let x2 = (-1*b - Math.sqrt(D))/2*a;
            console.log('There are 2 roots')
            console.log(`x1 = ${x1}\nx2 = ${x2}`)
        } else if (D=0) {
            x = -1 *(b/(2*a))
            console.log('There is 1 root')
            console.log('x = ', x)
        } else {
            console.log('There are 0 roots')
        }
    } else {
        console.log('Please, enter \'a\' not equal 0');
    }
}

