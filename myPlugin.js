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


let arr = ['hello', 'from', 'easy', 'programming', '.net'];
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
        textdecoration: 'underline'
    }, options);
    
    return this.css({
        'color': settings.color,
        'font-size': settings.fontSize,
        'text-decoration': settings.textdecoration
    });
    }

}( jQuery ));



$('#result').append($(arr).listThis('ul').colorMyList(
	{
	color: '#0000ff',
    fontSize: '30px',
    textDecoration: 'none'
	}
));
