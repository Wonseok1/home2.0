
var noticeQnAPopupAnswer = {
    init() {
        // alert("답장js잘붙었나확인용") //잘분어있음
        // 부모창: 팝업을 띄울창  / 자식창: 팝업창

        //부모창으로부터 받아오는 데이터
        var qnAId = opener.$("#qnAId").val();
        var qnAOriginId = opener.$("#qnAOriginId").val();
        var qnAOrdId = opener.$("#qnAOrdId").val();
        var qnAGroupId = opener.$("#qnAGroupId").val();
        var qnAUserNm = opener.$("#qnAUserNm").val();
        var qnAPhoneNo = opener.$("#qnAPhoneNo").val();
        var qnATelNo = opener.$("#qnATelNo").val();
        var qnACompNm = opener.$("#qnACompNm").val();
        var qnATitle = opener.$("#qnATitle").val();
        var qnAContent = opener.$("#qnAContent").val();
        // var qnAPassWord = opener.$("#qnAPassWordHidden").val();  //패스워드는 관리자비번 새로 넣을거임
        var qnAState = opener.$("#qnAState").val();

        //부모창으로부터 받아오는 데이터를 자식창에 띄우기
        var LineChange = "\n\n------Original Message------\n\n"
        $("#qnAPopupAnswerId").val(qnAId);
        $("#qnAPopupAnswerOriginId").val(qnAOriginId);
        $("#qnAPopupAnswerOrdId").val(qnAOrdId);
        $("#qnAPopupAnswerGroupId").val(qnAGroupId);
        $("#qnAPopupAnswerUserNm").val(qnAUserNm);
        $("#qnAPopupAnswerPhoneNo").val(qnAPhoneNo);
        $("#qnAPopupAnswerTelNo").val(qnATelNo);
        $("#qnAPopupAnswerCompNm").val(qnACompNm);
        $("#qnAPopupAnswerTitle").val(qnATitle);
        $("#qnAPopupAnswerContent").val( LineChange+qnAContent )
        // $("#qnAPopupAnswerPassWord").val(qnAPassWord);
        $("#qnAPopupAnswerState").val(qnAState);

        //답변버튼이벤트
        $("#btnAnswerQnA").on("click",function(){
            noticeQnAPopupAnswer.answer();
        });



    }, // init END
    //답변함수
    answer(){

        if ($("#qnAPopupAnswerGroupId").val() == 999) {
            alert("이미 답변한 글입니다.")
            return false
        } else {
            var formDatas = {
                qnAId: $("#qnAPopupAnswerId").val(),
                qnAOriginId: $("#qnAPopupAnswerOriginId").val(),
                qnAOrdId: $("#qnAPopupAnswerOrdId").val(),
                qnAGroupId: $("#qnAPopupAnswerGroupId").val(),
                qnATitle: $("#qnAPopupAnswerTitle").val(),
                qnAContent: $("#qnAAnswerContentPopup").val()+$("#qnAPopupAnswerContent").val(),
                qnAUserNm: $("#qnAPopupAnswerUserNm").val(),
                qnAPhoneNo: $("#qnAPopupAnswerPhoneNo").val(),
                qnATelNo: $("#qnAPopupAnswerTelNo").val(),
                qnACompNm: $("#qnAPopupAnswerCompNm").val(),
                qnAPassWord: $("#qnAManagerPW").val(),
                qnAState: $("#qnAPopupAnswerState").val(),

            }
            $.ajax({
                type: 'POST',
                url: '/web/notice/noticeQnA/answerQnA',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formDatas)
            }).done(function (data) {
                if (data == "answer") {
                    alert("답변이 등록되었습니다.")
                    opener.parent.location.reload();
                    window.close();

                }
            });
        }
    }, //answer() END
} //noticeQnAPopupAnswer END

noticeQnAPopupAnswer.init();

