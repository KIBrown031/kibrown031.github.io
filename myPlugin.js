// https://learn.jquery.com/plugins/basic-plugin-creation/


// myPlugin()
(function($) {

    // Plugin definition
    $.fn.myPlugin = function(options) {

        // Default settings
        var settings = $.extend({
            option1: 'value1',
            option2: 'value2'
        }, options);

        // Plugin logic
        return this.each(function() {
            console.log($(this));
            // Access the current element with $(this)
            // Use settings.option1, settings.option2, etc.
        });
    };

})(jQuery);


//greenify()
(function ( $ ) {
 
    $.fn.greenify = function() {
        this.css( "color", "green" );
        return this;
    };
 
}( jQuery ));



//showLinkLocation()
(function( $ ) {
 
    $.fn.showLinkLocation = function() {
 
        this.filter( "a" ).each(function() {
            var link = $( this );
            link.append( " (" + link.attr( "href" ) + ")" );
        });
 
        return this;
 
    };
 
}( jQuery ));
 
// Usage example:
// $( "a" ).showLinkLocation();


let arr = ['This', 'Unordered', 'List', 'Is', 'Demonstrating', 'Plugins',
      ' ', 'This', 'Unordered', 'List', 'Is', 'Demonstrating', 'Plugins',
      ' ', 'This', 'Unordered', 'List', 'Is', 'Demonstrating', 'Plugins'];
//listThis()
(function( $ ) {

    $.fn.listThis = function(listType) {
        let l =  $('<' + listType + '>');
    
    this.each(function(i, item) {
        $(l).append($('<li>').append(item));
    });
    
    return l;
    }

}( jQuery ));


//colorMyList()
(function( $ ) {

    $.fn.colorMyList = function(options) {
        let settings = $.extend({
        color: '#000',
        fontSize: '16px',
        // textdecoration: 'underline'
        textdecoration: 'none'
    }, options);
    
    return this.css({
        'color': settings.color,
        'font-size': settings.fontSize,
        'text-decoration': settings.textdecoration
    });
    }

}( jQuery ));



$('#resultttt').append($(arr).listThis('ul').colorMyList(  // remove ttt to run on load - should be: $('#result')
	{
	// color: '#ff0000',
    // fontSize: '60px',
    textdecoration: 'underline'
	}
));



const array = ["hello","from","GFG"];
 
// Traversing array using jQuery.each() method
console.log("traversing in array using jQuery.each() method");
jQuery.each(array, function(index,value) {
    console.log('index: ' + index + '   ' + 'value: ' + value);
});