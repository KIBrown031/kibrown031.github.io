
let topofpage = document.querySelector('.div-date-value');
let currentDate = new Date;
topofpage.innerHTML = `${currentDate.toLocaleString()}`;   


if ( window.matchMedia('(min-width: 768px)').matches ) {
  console.log(" window.matchMedia('(min-width: 768px)': MATCHES" );
}
else {
  alert( "matchMedia: MISMATCH");
  $('.div-json-table').css("font-size", "12px");
}



$(".input-text").keypress(function(event) {
  if (event.which == 13) {
    $('.button-find').click(); // Code to execute when Enter is pressed
    console.log("Enter key pressed");
  }
});


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


$(".button-ajax").click(function(){
  
  $.ajax({
    url: '/csv/schedule.csv',
    dataType: 'text',
    success: function(data) {
      const lines = data.split('\n');
      const headers = lines[0].split(',');
  
      const jsonData = [];
  
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        const obj = {};
  
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
  
        jsonData.push(obj);
      }
  
      console.log(jsonData); // Your JSON data
      alert('CSV Load SUCCESS!!! - Check console');
    },
    error: function () {
      alert('CSV Load FAILED!!!');
    }
  });

});


$(".button-json").click( function() {  // <div class="div-json-table"></div>
  // noupdated.json   
  // search.json
  // junk.json
  // minimal.json
  
  let regex = /^z0.*$/;              // starts with 'z0'
  let regexAlpha = /^[^A-Za-z].*$/;  // must start with a letter, not a period .

  $.getJSON("/json/simple.json", function(data) {  // junk.json contains 'secrets'
    
    data.sort((a, b) => a.Name < b.Name ? -1 : 1);

    var table = $("<table>");

    // Create table header
    var header = $("<tr>");
    for (var key in data[0]) {
      header.append("<th>" + key + "</th>");
    }
    table.append(header);

    // Create table rows
    $.each(data, function(index, row) {   // rows

      if ( regexAlpha.test(row.Name) ) { return true; } // starts with '.' so 'continue 
      if ( regex.test(row.Name) ) { return true; }      // starts with 'z0' so 'continue 
      

      var tr = $("<tr>");

      $.each(row, function(key, value) {   // columns within a row     
        tr.append("<td>" + value + "</td>");
      });
      table.append(tr);
    });

    // alert('Success - JSON Table!!!');
    // console.log(table);

    $('img').hide() // hide all images
    
    $(".div-json-table").append(table);

    $("tr:nth-child(even)").addClass("GFG");
    
  })
  .done(function(data){ console.log( "SUCCESS! from .done()", data ) })
  .fail(function(){})
  .always(function(){});

  
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


/*
$.getJSON(url,data, successCallbacK)
.done(function(){})
.fail(function(){})
.always(function(){});
*/