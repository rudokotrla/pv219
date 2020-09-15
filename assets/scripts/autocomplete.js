
$(document).ready(function() {
    addAutocomplete();
});

function addAutocomplete() {
    $('ul.medinputs input').autocomplete({
        source: '/api/search',
        minLength: 3,

    });
}