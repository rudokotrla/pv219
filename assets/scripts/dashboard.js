
var template = Handlebars.templates.requestblock;



$(document).ready(function() {
    reloadRequests();
});

function redrawRequestList(data) {
    $("#requestlist").remove();

    $(document.body).append(template({
        requests: data
    }));
    $(".deleterequestbtn").click(function() {
        deleteRequest($(this).parent().parent().attr('data-request-id'));
    });

}


function deleteRequest(id){
    $.ajax({
        type: 'DELETE',
        url: "/api/requests/",
        dataType: "json",
        data: {"reqid": id},
        success: (data, status, xhr) => {
            redrawRequestList(data);

        }

    });
}

function reloadRequests() {
    $.ajax({
        type: "GET",
        url: "/api/requests",
        success: (data, status, xhr) => {
            redrawRequestList(data);
        }
    });
}