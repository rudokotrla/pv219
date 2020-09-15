var template = Handlebars.templates.medinput;

$(document).ready(function(){
    const maxField = 10;
    var currFields = 1;
    var addButton = $('#addmed');
    var container = $('.medinputs');
    $(addButton).click(function(){
        if (currFields < maxField) {
            currFields++;
            $(container).append(template());

            $("button.removemed").click(function(){
                $(this).parent().remove();
                currFields--;
                });
        }
    });


});