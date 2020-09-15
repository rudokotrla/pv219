
$(document).ready(function() {


    $('ul.medinputs input').autocomplete({
        source: '/api/search',
        minLength: 3,

    });

});

