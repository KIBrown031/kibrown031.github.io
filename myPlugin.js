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