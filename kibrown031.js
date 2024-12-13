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
  $.getJSON("/json/junk.json", function(data) {  // junk.json contains 'secrets'
    var table = $("<table>");

    // Create table header
    var header = $("<tr>");
    for (var key in data[0]) {
      header.append("<th>" + key + "</th>");
    }
    table.append(header);

    // Create table rows
    $.each(data, function(index, row) {
      var tr = $("<tr>");
      $.each(row, function(key, value) {
        tr.append("<td>" + value + "</td>");
      });
      table.append(tr);
    });

    alert('Success - JSON Table!!!');
    console.log(table);
    $(".div-json-table").append(table);
    
  });
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
