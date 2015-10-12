function check(template) {
    //console.log('checking server! arg received: ' + template);
        
    $.ajax({
        url: "https://mcapi.us/server/status?ip=coolworld.servegame.com&port=25565",
        dataType: "json"
    })
        .done(function (data) {
            //console.log("data receive: ", data);
            //console.log('got data. the template is ' + template);

            // api server up and running
            if (data.status === "success") {
                $("#serverStatus").replaceWith(template({ online: data.online }));
            } else {
                $("#serverStatus").html("Could not get server status");
            }
        
            // re-check every so often
            setTimeout($.proxy(check, this, template), 30000);
        });
}


$(document).ready(function() {
    
    // compile & cache templates
    var minecraftStatusTemplate = _.template($("#minecraftStatusTemplate").html());

    check(minecraftStatusTemplate);
    
});
