
//noticeQnAManage에는 검색조건에 조회기간이 있기때문에 noticeQnAManage.js 와  noticeQnA.js 로 나눔
var noticeQnAManage = {

    init() {
        // alert("qna js 잘붙었나확인용 ") // 잘붙어있음
        var NoticeQnAGrid = document.querySelector('#NoticeQnAGrid');
        new agGrid.Grid(NoticeQnAGrid, noticeQnAGridOptions);

        // QnA

        // // //로그인정보 있을경우에만 표시
        // if(로그인한ID==""){
        //     $("#btnAnswerQnA").hide()
        // }

        //신규버튼이벤트
        $("#btnNewQnA").on("click", function () {
            $("#noticeQnA_form")[0].reset();
        });


        //조회버튼이벤트
        $("#btnSearchQnA").on("click", function () {
            var stDt = $("#searchQnAStartDt").val();
            var endDt = $("#searchQnAEndDt").val();
            alert("조회클릭함")
            if(stDt !="" && endDt==""){
                alert("조회기간을 From-To로 입력하십시오.");
                return false;
            }else if (stDt=="" && endDt!=""){
                alert("조회기간을 From-To로 입력하십시오.");
                return false;
            }else if (stDt> endDt){
                alert("조회기간을 From-To로 입력하십시오.");
                return false;
            }
            else {

                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val()+ $("#qnASearchCondition").val())==""){
                    alert("아무조건 ㄴㄴ")
                    noticeQnAManage.findAll();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())!="" && $("#qnASearchCondition").val()=="") {
                    alert("기간만")
                    noticeQnAManage.findAllByDate();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())=="" && $("#searchSelectBox").val()=='title'){
                    alert("기간없이 셀박제목만 셀렉박스머선탣ㄱ?"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByTitle();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())=="" && $("#searchSelectBox").val()=='content'){
                    alert("기간없이 셀박내용만"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByContent();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())=="" && $("#searchSelectBox").val()=='all' && $("#qnASearchCondition").val()!=""){
                    alert("기간없이 셀박전체만"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByTitleOrContent();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())!="" && $("#searchSelectBox").val()=='all' && $("#qnASearchCondition").val()!=""){
                    alert("기간+셀박전체"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByDateAndTitleOrContent();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())!="" && $("#searchSelectBox").val()=='title' && $("#qnASearchCondition").val()!=""){
                    alert("기간+셀박제목만"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByDateAndTitle();
                }
                if(($("#searchQnAStartDt").val()+ $("#searchQnAEndDt").val())!="" && $("#searchSelectBox").val()=='content' && $("#qnASearchCondition").val()!=""){
                    alert("기간+셀박내용만"+$("#searchSelectBox").val())
                    noticeQnAManage.findAllByDateAndContent();
                }
            }
        });

        //답변버튼이벤트
        $("#btnAnswerQnA").on("click",function(){
            noticeQnAManage.answer();
        });


        //저장버튼이벤트
        $("#btnSaveQnA").on("click", function () {

            var chk = confirm("저장하시겠습니까?");

            if (chk == true){
                if($("#qnATitle").val()==""){
                    alert("제목은 필수 입력 항목입니다.");
                    return false;
                }else if($("#qnAUserNm").val()=="") {
                    alert("고객명은 필수 입력 항목입니다.");
                    return false;
                }else if($("#qnAContent").val()=="") {
                    alert("내용은 필수 입력 항목입니다.");
                    return false;
                }

                else {
                    //글작성시 비밀번호 함께 입력했을경우
                    if( $("#qnAPassWordHidden").val()!=""){
                        if($("#qnAPassWordHidden").val()==$("#qnAPassWord").val()){
                            if( $("#qnAId").val()!=0){
                                noticeQnAManage.update();
                            }else {
                                noticeQnAManage.save();
                            }
                        }else {
                            alert("비밀번호를 확인해주세요")
                        }
                        //글작성시 비밀번호 입력하지 않거나 신규작성일경우
                    }else {
                        if( $("#qnAId").val()!=0){
                            noticeQnAManage.update();
                        }else {
                            noticeQnAManage.save();
                        }
                    }
                }
            }
        });

        //삭제버튼이벤트
        $("#btnDeleteQnA").on("click", function () {
            if (noticeQnAGridOptions.api.getSelectedRows().length > 0) {
                var chk = confirm("삭제하시겠습니까?");
                if (chk == true) {
                    //글작성시 비밀번호 함께 입력했을경우
                    if( $("#qnAPassWordHidden").val()!=""){
                        if($("#qnAPassWordHidden").val()==$("#qnAPassWord").val()){
                            noticeQnAManage.delete();
                        }else {
                            alert("비밀번호를 확인해주세요")
                        }
                        //글작성시 비밀번호 입력하지 않거나 신규작성일경우
                    }else {
                        noticeQnAManage.delete();
                    }
                }
            } else {
                alert("삭제할 대상을 선택해주세요");
            }
        });

    },  //init() End


    //전체검색
    findAll : function () {
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAll'}).then(function(data) {

            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //조회기간으로 검색
    findAllByDate : function () {
        var searchQnAStartDt =parseInt($("#searchQnAStartDt").val().replaceAll("-", ""));
        var searchQnAEndDt =parseInt($("#searchQnAEndDt").val().replaceAll("-", ""));
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findByDate/'+searchQnAStartDt+'/'+searchQnAEndDt}).then(function(data) {
            noticeQnAGridOptions.api.setRowData(data);
        });
    },


    //제목으로 검색
    findAllByTitle : function(){

        var searchQnATitle = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findByTitle/'+searchQnATitle}).then(function(data){
            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //내용으로 검색
    findAllByContent : function(){
        alert("TEST!!")

        var searchQnAContent = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findByContent/'+searchQnAContent}).then(function(data) {

            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //제목+내용으로 검색
    findAllByTitleOrContent : function(){
        var searchQnATitleOrContent = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAllByTitleOrContent/'+searchQnATitleOrContent}).then(function(data) {

            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //기간+제목+내용으로 검색
    findAllByDateAndTitleOrContent : function(){
        var searchQnAStartDt =parseInt($("#searchQnAStartDt").val().replaceAll("-", ""));
        var searchQnAEndDt =parseInt($("#searchQnAEndDt").val().replaceAll("-", ""));
        var searchQnATitleOrContent = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAllByDateAndTitleOrContent/'+searchQnAStartDt+'/'+searchQnAEndDt+'/'+searchQnATitleOrContent}).then(function(data) {
            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //기간+제목으로 검색
    findAllByDateAndTitle : function(){
        var searchQnAStartDt =parseInt($("#searchQnAStartDt").val().replaceAll("-", ""));
        var searchQnAEndDt =parseInt($("#searchQnAEndDt").val().replaceAll("-", ""));
        var searchQnATitle = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAllByDateAndTitle/'+searchQnAStartDt+'/'+searchQnAEndDt+'/'+searchQnATitle}).then(function(data) {
            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //기간+내용으로 검색
    findAllByDateAndContent : function(){
        var searchQnAStartDt =parseInt($("#searchQnAStartDt").val().replaceAll("-", ""));
        var searchQnAEndDt =parseInt($("#searchQnAEndDt").val().replaceAll("-", ""));
        var searchqnAContent = $("#qnASearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAllByDateAndContent/'+searchQnAStartDt+'/'+searchQnAEndDt+'/'+searchqnAContent}).then(function(data) {
            noticeQnAGridOptions.api.setRowData(data);
        });
    },

    //저장함수 ( qnAId가 PK이자 자동증가값이라서 신규작성할 경우에는 formDatas에 넣으면 notNull인데 null드갔다 오류남
    //        근데또 formDatas에 안넣자니 수정할경우에는  PK인 qnAId를 빼고 넘기면 신규로 인식해버림.. 그래서 걍
    //        save함수랑 update함수로 나눔 )
    save(){
        alert($("#qnAPassWord").val())
        var formDatas = {
            // qnAId: $("#qnAId").val(),
            qnATitle: $("#qnATitle").val(),
            qnAContent: $("#qnAContent").val(),
            qnAUserNm:  $("#qnAUserNm").val() ,
            qnAPhoneNo: $("#qnAPhoneNo").val() ,
            qnATelNo: $("#qnATelNo").val() ,
            qnACompNm: $("#qnACompNm").val() ,
            qnAPassWord: $("#qnAPassWord").val() ,
            // ordNo: $("#ordNo").val(),
            // useYn: $("#useYn").val(),

        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeQnA/saveQnA',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){

            if(data=="save"){
                alert("QnA가 신규등록되었습니다.")
                noticeQnAManage.findAll();
                noticeQnAGridOptions.api.setRowData(null)
            }
        });
    }, //save() END

    //수정함수
    update(){
        var formDatas = {
            qnAId: $("#qnAId").val(),
            qnATitle: $("#qnATitle").val(),
            qnAContent: $("#qnAContent").val(),
            qnAUserNm:  $("#qnAUserNm").val() ,
            qnAPhoneNo: $("#qnAPhoneNo").val() ,
            qnATelNo: $("#qnATelNo").val() ,
            qnACompNm: $("#qnACompNm").val() ,
            qnAPassWord: $("#qnAPassWord").val() ,
            qnAState: $("#qnAState").val() ,

            // ordNo: $("#ordNo").val(),
            // useYn: $("#useYn").val(),

        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeQnA/saveQnA',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="update"){
                alert("QnA가 수정되었습니다.")
                noticeQnAManage.findAll();
                noticeQnAGridOptions.api.setRowData(null)
            }
        });
    }, //update() END

    //답변함수
    answer(){
        var formDatas = {
            qnAId: $("#qnAId").val(),
            qnATitle: $("#qnATitle").val(),
            qnAContent: $("#qnAContent").val(),
            qnAUserNm:  $("#qnAUserNm").val() ,
            qnAPhoneNo: $("#qnAPhoneNo").val() ,
            qnATelNo: $("#qnATelNo").val() ,
            qnACompNm: $("#qnACompNm").val() ,
            qnAPassWord: $("#qnAPassWord").val() ,
            qnAState: noticeQnAGridOptions.api.getSelectedRows()[0].qnAState ,

        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeQnA/answerQnA',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="answer") {
                alert("답변이 등록되었습니다.")
                noticeQnAManage.findAll();
                noticeQnAGridOptions.api.setRowData(null)
            }
        });
    }, //answer() END


    //삭제함수
    delete(){
        var selectedRows = noticeQnAGridOptions.api.getSelectedRows()[0];
        $.ajax({
            type: 'DELETE',
            url : '/web/notice/noticeQnA/deleteQnA',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(selectedRows)
        }).done(function (){
            alert("삭제되었습니다.");
            noticeQnAManage.findAll();
        }).fail(function (error){

        });


    }, //delete() END

    setData: function (data) {

        $("#creId").val(data.creId);
        $("#noticeNo").val(data.noticeNo);
        $("#qnATitle").val(data.qnATitle);
        $("#qnAContent").val(data.qnAContent);
        $("#noticeStartDt").val(data.noticeStartDt);
        $("#noticeEndDt").val(data.noticeEndDt);
    },

} //noticeQnA END

var noticeQnAGridOptions = {
    columnDefs: [
        {headerName: "QnA아이디", field: 'qnAId', editable: false, width: 10,hide : true}
        , {headerName: "처리상태", field: 'qnAState', editable: false, width: 90}
        , {headerName: "제목", field: 'qnATitle', editable: false, width: 200}
        , {headerName: "내용", field: 'qnAContent', editable: false, width: 350}
        , {headerName: "고객명", field: 'qnAUserNm', editable: false, width: 80}
        , {headerName: "회사명", field: 'qnACompNm', editable: false, width: 140}
        , {headerName: "Mobile", field: 'qnAPhoneNo', editable: false, width: 120}
        , {headerName: "Tel", field: 'qnATelNo', editable: false, width: 120}
        , {headerName: "등록일", field: 'creDt', editable: false, width: 120}
        , {headerName: "비밀번호", field: 'qnAPassWord', editable: false,width: 10,hide : true}
    ],
    //기본 컬럼 옵션 설정
    defaultColDef: {
        cellStyle: {textAlign: 'center'},
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: true,                   //상단 필터 여부(항상 떠있는지)
        resizable: true,                        //크기 조절 가능 여부
        sortable: true,                         //정렬 가능 여부
    },
    //컬럼 타입별 옵션 설정
    columnTypes: {
        numberColumn: {width: 100, filter: 'agNumberColumnFilter'},
        nonEditableColumn: {editable: false},
        dateColumn: {
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    var cellDate = new Date(cellValue);
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
            },
        },
    },
    rowSelection: 'single',
    rowMultiSelectWithClick: true,
    editType: 'fullRow',
    stopEditingWhenGridLosesFocus: true,
    onCellEditingStopped: function (event) {
    },
    onRowClicked: function (event) {
        $("#qnAId").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnAId);
        $("#qnAUserNm").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnAUserNm);
        $("#qnAPhoneNo").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnAPhoneNo);
        $("#qnATelNo").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnATelNo);
        $("#qnACompNm").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnACompNm);
        $("#qnATitle").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnATitle);
        $("#qnAContent").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnAContent);
        $("#qnAPassWordHidden").val(noticeQnAGridOptions.api.getSelectedRows()[0].qnAPassWord);
        $("#qnAPassWord").val("");
    },
    onGridReady(event) {
        noticeQnAManage.findAll();
        event.api.sizeColumnsToFit();
    }
} // 그리드옵션 End


noticeQnAManage.init();

