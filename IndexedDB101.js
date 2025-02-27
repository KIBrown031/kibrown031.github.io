
// let arr = Array.from({length: 1000}, (value, index)=> index)
   let arr = Array.from({length: 1000}, (e, i)=> i+250) // arr == array of 1000 elementslet arr = Array.from({length: 1000}, (value, index)=> index) // arr == array of 1000 elements

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
let open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    let db = open.result;
    let store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    let index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
    // Start a new transaction
    
    // IDBDatabase
    let db = open.result;
    
    // IDBTransaction
    let tx = db.transaction("MyObjectStore", "readwrite");
    
    // IDBObjectStore
    let store = tx.objectStore("MyObjectStore");
    
    // IDBIndex
    let index = store.index("NameIndex");

    // Add some data
    id = 12345;
    age = 50;
    extra = 1;

    arr.forEach( (num, ndx) => { // arr == array of 1000 elements * 14 ==  14,000
        store.put({ id: id++, name: {first: "John", last: "Doe"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Bob", last: "Smith"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Larry", last: "Alston"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Frank", last: "Vann"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Emma", last: "Harding"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Leroy", last: "Scott"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Oscar", last: "Simpson"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Tim", last: "Kirkland"}, age: age++, extra: extra++ }); 
        store.put({ id: id++, name: {first: "Jake", last: "Jackson"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Bob", last: "Newhart"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Luke", last: "McCoy"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Matthew", last: "Henson"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Sam", last: "Malone"}, age: age++, extra: extra++ });
        store.put({ id: id++, name: {first: "Clark", last: "Gable"}, age: age++, extra: extra++ });
    })

    
    // Query the data
    let getJohn = store.get(12345);
    let getBob = index.get(["Smith", "Bob"]);

    getJohn.onsuccess = function() {
        console.log( `${getJohn?.result?.name?.first} ${getJohn?.result?.name?.last}` );  // => "John"
    };

    getBob.onsuccess = function() {
        console.log( `${getBob?.result?.name?.first} ${getBob?.result?.name?.last}` );   // => "Bob"
    };

    
    //let query = store.index("NameIndex");
    //let getJakeAll = query.getAll("Jackson");
    let getJakeAll = index.getAll("Smith")
    getJakeAll.onsuccess = function() {
        console.log(getJakeAll?.result);
        console.log( `${getJakeAll?.result} ${getJakeAll?.result}` );   // => "Jake"
    };

    getAll(db, store)

    // my addition for have cursor go through data base
/*
    store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          console.log(`Name for ID: ${cursor.key} is ${cursor.value.name.first} ${cursor.value.name.last} - ${cursor.value?.extra}`);
          cursor.continue();
        } else {
          console.log("No more entries!");
        }
      }
*/




    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

/*  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

// Open (or create) the database
let open = indexedDB.open("MyDatabase", 1);

const objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    console.log(`Name for SSN ${cursor.key} is ${cursor.value.name}`);
    cursor.continue();
  } else {
    console.log("No more entries!");
  }
}
*/


/*  https://stackoverflow.com/questions/47931595/indexeddb-getting-all-data-with-keys


    transaction = this.db.transaction(["table"]);
    object_store = transaction.objectStore("table");
    request = object_store.openCursor();

    request.onerror = function(event) {
    console.err("error fetching data");
    };
    request.onsuccess = function(event) {
    let cursor = event.target.result;
    if (cursor) {
        let key = cursor.primaryKey;
        let value = cursor.value;
        console.log(key, value);
        cursor.continue();
    }
    else {
        // no more results
    }
    };

*/

const getAll = (db, store) => new Promise((res, rej) => {
    // Fetch keys
    const keysTr = db.transaction(store).objectStore(store).getAllKeys()
    keysTr.onsuccess = (event) => {
      const keys = event.target.result
      if (keys?.length) {
        // Start a new transaction for final result
        const valuesTr = db.transaction(store)
        const objStore = valuesTr.objectStore(store)
  
        const result = [] // { key, value }[]
  
        // Iterate over keys
        keys.forEach(key => {
          const tr = objStore.get(key)
          tr.onsuccess = e => {
            result.push({
              key,
              value: e.target.result
            })
          }
        })
        // Resolve `getAll` with final { key, value }[] result
        valuesTr.oncomplete = (event) => {
          res(result)
        }
        valuesTr.onerror = (event) => {
          rej(event)
        }
      }
      else
        res([])
    }
    keysTr.onerror = (event) => {
      rej(event)
    }
  })