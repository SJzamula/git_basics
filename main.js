'use strict'

const solution = (a, b, c) => {
    if (a != 0) {
        let x;
        let equal = a*Math.pow(x, 2) + b*x + c;
        let D = Math.pow(b, 2)- 4*a*c
        if (D>0) {
            let x1 = (-1*b + Math.sqrt(D))/2*a;
            let x2 = (-1*b - Math.sqrt(D))/2*a;
            console.log('x1 = ', x1, ' and x2 = ', x2)
        } else if (D=0) {
            x = -1 *(b/(2*a))
            console.log('x = ', x)
        } else {
            console.log('Equaulation has no roots')
        }
    } else {
        console.log('Please, enter \'a\' not equal 0');
    }
    nhhjuuuuuuuuuuuuuuuuuuuuuuuuuuuuunjhmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmnhhhhhhhhhhhhhhhhhhhhhhhhhhh
}

