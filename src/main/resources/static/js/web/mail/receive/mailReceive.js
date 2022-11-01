
const mailReceive = {
    init() {

        $("#mailReceive_reply").on("click", function () {
            $("#mailReceive_replyDiv").removeClass("hidden");
            $("#mailReceive_forwardDiv").addClass("hidden");
            mailReceive.setReplyMailContent();
        });

        $("#mailReceive_forward").on("click", function () {
            $("#mailReceive_forwardDiv").removeClass("hidden");
            $("#mailReceive_replyDiv").addClass("hidden");
            mailReceive.setForwardMailContent();

        });

        $("#mailReceive_list").on("click", function () {
        });

        $("#mailReceive_replySend").on("click", function () {
        });

        $("#mailReceive_forwardSend").on("click", function () {
        });

        $("#mailReceive_replyX").on("click", function () {
            $("#mailReceive_replyDiv").addClass("hidden");
        });

        $("#mailReceive_forwardX").on("click", function () {
            $("#mailReceive_forwardDiv").addClass("hidden");
        });


        $("#mailReceive_title").text("제목 테스트");
        $("#mailReceive_date").val(new Date());
        $("#mailReceive_from").val("보낸 사람 테스트");
        $("#mailReceive_to").val("받은 사람 테스트");
        $("#mailReceive_content").val("내용 테스트");



    },

    setReplyMailContent() {

        let title = $("#mailReceive_title").val();
        let from = $("#mailReceive_from").val();
        let to = $("#mailReceive_to").val();
        let content = $("#mailReceive_content").val();
        content = "\n\n\n" +
            "---------- Original message -----------\n" +
            "From: " + from + "\n"+
            "To: "+ to +"\n"+
            "Date: "+"\n"+
            "Subject: " + title +"\n\n"+
            content;

        $("#mailReceive_replyTo").val(from);
        $("#mailReceive_replyToOther").val();
        $("#mailReceive_replyFile").val();
        $("#mailReceive_replyContent").val(content);

    },

    setForwardMailContent() {

        let title = $("#mailReceive_title").val();
        let from = $("#mailReceive_from").val();
        let to = $("#mailReceive_to").val();
        let content = $("#mailReceive_content").val();
        content = "\n\n\n" +
                "---------- Forwarded message -----------\n" +
                "From: " + from + "\n"+
                "To: "+ to +"\n"+
                "Date: "+"\n"+
                "Subject: " + title +"\n\n"+
                content;

        $("#mailReceive_forwardTo").val();
        $("#mailReceive_forwardToOther").val();
        $("#mailReceive_forwardFile").val();
        $("#mailReceive_forwardContent").val(content);

    },

}


mailReceive.init();
