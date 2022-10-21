
$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
    $("#loader").addClass("hidden");
    console.log("event ",event);
    console.log("jqxhr ",jqxhr);
    console.log("settings ",settings);
    console.log("thrownError ",thrownError);
    if (jqxhr.responseJSON) {
        itzAlert.error(itzAlert.makeMsgJson("오류코드:"+ jqxhr.responseJSON.status, "발생시간: "+ jqxhr.responseJSON.timestamp+ "<br>"+ jqxhr.responseJSON.message, "확인") );
    }else{
        itzAlert.error(itzAlert.makeMsgJson("오류코드: 404", "발생시간: "+ new Date()+ "<br>"+ "파일이 존재하지 않습니다." +"<br>"+ settings.url, "확인") );
    }

});
