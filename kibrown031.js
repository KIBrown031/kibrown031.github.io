let topofpage = document.querySelector('.fixed-top');
let currentDate = new Date;
topofpage.innerHTML = `${currentDate.toLocaleString()}`;   



// setTimeout()   setInterval()
document.body.addEventListener( "keydown", (event) => { console.log(`keydown: ${event.key}`); } );

function updateDate () {
  let datePicker = document.querySelector('.dateclass');
  
  document.querySelector('.date-value').innerHTML = datePicker.value;

  datePicker.addEventListener( "change", () => { console.log("change made to datePicker"); } )
}

function startup () {
  console.log('startup');
  document.querySelector('.dateclass').click();
  document.querySelector('.dateclass').showPicker();
}

