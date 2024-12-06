
function ast (){
  console.log(`

  **************************************************************

  `);
}

/*
function loadBackend() {
  // npm install xmlhttprequest --save
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    // console.log('before');
    console.log(xhr.responseText); // xhr.response: undefined
    // console.log('after');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();  
}
*/
// loadBackend();

ast();

console.log(__dirname);
console.log(__filename);

const os = require('os')

// os.uptime()
const systemUptime = os.uptime();

// os.userInfo()
const userInfo = os.userInfo();

// We will store some other information about my WindowsOS in this object:
const otherInfo = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}

// Let's Check The Results:
console.log(systemUptime);
console.log(userInfo);
console.log(otherInfo);




ast();



  // Import 'path' module using the 'require()' method:
const path = require('path')

// Assigning a path to the myPath variable
const myPath = '/mnt/c/Desktop/NodeJSTut/app.js'

const pathInfo = {
    fileName: path.basename(myPath),
    folderName: path.dirname(myPath),
    fileExtension: path.extname(myPath),
    absoluteOrNot: path.isAbsolute(myPath),
    detailInfo: path.parse(myPath),
}

// Let's See The Results:
console.log(pathInfo);


ast();

/*
// Importing 'events' module and creating an instance of the EventEmitter Class
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener Function - welcomeUser()
const welcomeUser = () => {
    console.log('Hi There, Welcome to the server!');
}

// Listening for the userJoined event using the on() method
myEmitter.on('userJoined', welcomeUser);

// Emitting the userJoined event using the emit() method
myEmitter.emit('userJoined');
*/

ast();

// Importing `events` module and creating an instance of EventEmitter class
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener Function 1: sayHello
const sayHello = () => {
    console.log('Hello User');
}

// Listener Function 2: sayHi
const sayHi = () => {
    console.log('Hi User');
}

// Listener Function 3: greetNewYear
const greetNewYear = () => {
    console.log('Happy New Year!');
}

// Subscribing to `userJoined` event
myEmitter.on('userJoined', sayHello);
myEmitter.on('userJoined', sayHi);
myEmitter.on('userJoined', greetNewYear);

// Emiting the `userJoined` Event
myEmitter.emit('userJoined');
