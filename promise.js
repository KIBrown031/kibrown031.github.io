let p = new Promise( (resolve, reject) => {
    let a = 1+1
    if (a == 2) {
        resolve('success')

    } else {
        reject('fail')
    }
})

p.then( (message) => {
    //debugger
    console.warn('this is the then(1): ' + message)
    return message;
})
.then( (message) => {
    //debugger
    console.warn('this is the then(2): ' + message)
    return message;
})
.then( (message) => {
    //debugger
    console.warn('this is the then(3): ' + message)
    return message;
})
.then( (message) => {
    //debugger
    console.warn('this is the then(4): ' + message)
    return message;
})
.then( (message) => {
    //debugger
    console.warn('this is the then(5): ' + message)
})
.catch()

function myFunc( val1, val2, cb) {
    console.log(val1+val2+cb())
}

myFunc(4,5,() => 30)