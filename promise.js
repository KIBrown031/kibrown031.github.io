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


// debugger
function myFunc( val1, val2, cb ) {
    if (typeof cb === "function") {
        console.log( val1 + val2 + cb() );
    } else console.log(val1 + val2, "not a function")
}

// myFunc(4, 5, () => 30 );
// debugger
// console.log( myFunc(4,5,() => 30) )

setTimeout( myFunc, 1000, 4, 5, () => {return 30} ) // If an arrow function uses a block body ({}), it must use a return statement to return a value.
setTimeout( myFunc, 1000, 4, 5, () => 30 )          // If an arrow function DOESNT uses a block body ( ), no return statement is needed to return a value.

"Hello, <> World!"

function greet() {
    return "Hello, World!";
  }
  
  console.log(greet()); // Prints "Hello, World!"

  
function testPromise() { 
    return new Promise((resolve, reject) => {    // only a resolve or reject will be called - whichever comes second will be ignored
        
        if (typeof reject === "function") {
            console.log( "This is a reject  function: ", reject );
            reject("reject message")
        } 
        if (typeof resolve === "function") {
            console.log( "This is a resolve function: ", resolve );
            resolve("resolve message")
        } 
  })
}

testPromise()
.then( (value) => console.log(value))
.catch((value) => console.log(value))



const promise = new Promise((resolve, reject) => {
    // resolve('Success!!!!!!!!!!!!'); 
    reject('Error!!!!!!!!!!!!!'); // This call is ignored
  });
  
  promise.then(
    (result) => console.log(result), // Output: Success!
    (error) => console.log(error)
  );
  debugger