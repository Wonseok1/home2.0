
$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
    $("#loader").addClass("hidden");
    console.log("event ",event);
    console.log("jqxhr ",jqxhr);
    console.log("settings ",settings);
    console.log("thrownError ",thrownError);
    itzAlert.error(itzAlert.makeMsgJson("오류코드:"+ jqxhr.responseJSON.status, "발생시간: "+ jqxhr.responseJSON.timestamp+ "<br>"+ jqxhr.responseJSON.message, "확인") );
});