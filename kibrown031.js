let topofpage = document.querySelector('.div-date-value');
let currentDate = new Date;
topofpage.innerHTML = `${currentDate.toLocaleString()}`;   

$("img").on("click", function() { // hide the images on the page
  $(this).toggle();  
});

$(".zoom-in").click(function(){
  $("img").width($("img").width()+100);
  $("img").height($("img").height()+100);
});

$(".zoom-out").click(function(){
  $("img").width($("img").width()-100);
  $("img").height($("img").height()-100);
});

// setTimeout()   setInterval()
document.body.addEventListener( "keydown", (event) => { console.log(`keydown: ${event.key}`); } );

function updateDate () {
  let datePicker = document.querySelector('.input-dateclass');
  
  document.querySelector('.div-date-value').innerHTML = datePicker.value;

  datePicker.addEventListener( "change", () => { console.log("change made to datePicker"); } )
}

function clickDatePicker () {
  console.log('clickDatePicker');
  // document.querySelector('.input-dateclass').click();
  
  document.querySelector('.input-dateclass').showPicker();
}

function loadjQueryInDevtools () { // paste directly into console
  var jq = document.createElement('script');
  jq.src = "//ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq);
  jQuery.noConflict();
}
