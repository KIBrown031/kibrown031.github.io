// https://dev.to/alexeagleson/how-to-use-indexeddb-to-store-data-for-your-web-application-in-the-browser-1o90

// 1
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("CarsDatabase", 1);


request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  
request.onupgradeneeded = function () {
    //1
    const db = request.result;

    //2
    const store = db.createObjectStore("cars", { keyPath: "id" });

    //3
    store.createIndex("cars_colour", ["colour"], { unique: false });

    // 4
    store.createIndex("colour_and_make", ["colour", "make"], {
        unique: false,
    }); 
};

request.onsuccess = function () {
    console.log("Database opened successfully");
  
    const db = request.result;
  
    // 1
    const transaction = db.transaction("cars", "readwrite");
  
    //2
    const store = transaction.objectStore("cars");
    const colourIndex = store.index("cars_colour");
    const makeModelIndex = store.index("colour_and_make");
  
    //3
    store.put({ id: 1, colour: "Red", make: "Toyota" });
    store.put({ id: 2, colour: "Red", make: "Kia" });
    store.put({ id: 3, colour: "Blue", make: "Honda" });
    store.put({ id: 4, colour: "Silver", make: "Subaru" });
  
    //4
    const idQuery = store.get(4);
    const colourQuery = colourIndex.getAll(["Red"]);
    const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);
  
    // 5
    idQuery.onsuccess = function () {
      console.log('idQuery', idQuery.result);
    };
    colourQuery.onsuccess = function () {
      console.log('colourQuery', colourQuery.result);
    };
    colourMakeQuery.onsuccess = function () {
      console.log('colourMakeQuery', colourMakeQuery.result);
    };

        // update data
    const subaru = store.get(4);

    subaru.onsuccess= function () {
    subaru.result.colour = "Green";
    store.put(subaru.result);
    }


    // remove data
    
    // const deleteCar = store.delete(1);

    // deleteCar.onsuccess = function () {
    // console.log("Red Toyota has been removed");
    // };


    const redCarKey = colourIndex.getKey(["Red"]);

    redCarKey.onsuccess = function () {
        const deleteCar = store.delete(redCarKey.result);

        deleteCar.onsuccess = function () {
            console.log("Red car has been removed");
        };
    };

  
    // 6
    transaction.oncomplete = function () {
      db.close();
    };


};

  


  
