
var notice = {

    /** 이건 첨부파일테스트용임 noticdNoticdManage.js에서 작업할것  */
    init() {
        var NoticeNoticeGrid = document.querySelector('#NoticeNoticeGrid');
        new agGrid.Grid(NoticeNoticeGrid, noticeNoticeGridOptions);
        // var NoticeNoticeQuickGrid = document.querySelector('#NoticeNoticeQuickGrid');
        // new agGrid.Grid(NoticeNoticeQuickGrid, noticeNoticeQuickGridOptions);


        // 공지사항

        //신규버튼이벤트
        $("#btnNewNotice").on("click", function () {

            $("#noticeNotice_form")[0].reset();
        });


        //조회버튼이벤트
        $("#btnSearchNotice").on("click", function () {
            var stDt = $("#searchNoticeStartDt").val();
            var endDt = $("#searchNoticeEndDt").val();
            alert("조회클릭함")
            if(stDt !="" && endDt==""){
                alert("공지기간을 From-To로 입력하십시오.");
                return false;
            }else if (stDt=="" && endDt!=""){
                alert("공지기간을 From-To로 입력하십시오.");
                return false;
            }else if (stDt> endDt){
                alert("공지기간을 From-To로 입력하십시오.");
                return false;
            }
            else {

                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val()+ $("#noticeSearchCondition").val())==""){
                    alert("아무조건 ㄴㄴ")
                    noticeNotice.findAll();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())!="" && $("#noticeSearchCondition").val()=="") {
                    alert("공지기간만")
                    noticeNotice.findAllByDate();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())=="" && $("#searchSelectBox").val()=='title'){
                    alert("공지기간없이 셀박제목만 셀렉박스머선탣ㄱ?"+$("#searchSelectBox").val())
                    noticeNotice.findAllByTitle();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())=="" && $("#searchSelectBox").val()=='content'){
                    alert("공지기간없이 셀박내용만"+$("#searchSelectBox").val())
                    noticeNotice.findAllByContent();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())=="" && $("#searchSelectBox").val()=='all' && $("#noticeSearchCondition").val()!=""){
                    alert("공지기간없이 셀박전체만"+$("#searchSelectBox").val())
                    noticeNotice.findAllByTitleOrContentOrCreId();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())!="" && $("#searchSelectBox").val()=='all' && $("#noticeSearchCondition").val()!=""){
                    alert("공지기간+셀박전체"+$("#searchSelectBox").val())
                    noticeNotice.findAllByDateAndTitleOrContentOrCreId();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())!="" && $("#searchSelectBox").val()=='title' && $("#noticeSearchCondition").val()!=""){
                    alert("공지기간+셀박제목만"+$("#searchSelectBox").val())
                    noticeNotice.findAllByDateAndTitle();
                }
                if(($("#searchNoticeStartDt").val()+ $("#searchNoticeEndDt").val())!="" && $("#searchSelectBox").val()=='content' && $("#noticeSearchCondition").val()!=""){
                    alert("공지기간+셀박내용만"+$("#searchSelectBox").val())
                    noticeNotice.findAllByDateAndContent();
                }
            }
        });

        //저장버튼이벤트
        $("#btnSaveNotice").on("click", function () {
            var stDt = parseInt($("#noticeStartDt").val().replaceAll("-", ""));
            var endDt = parseInt($("#noticeEndDt").val().replaceAll("-", ""));
            var chk = confirm("저장하시겠습니까?");

            if (chk == true){
                if($("#noticeTitle").val()==""){
                    alert("제목은 필수 입력 항목입니다.");
                    return false;
                }else if($("#noticeStartDt").val()=="") {
                    alert("공지시작일은 필수 입력 항목입니다.");
                    return false;
                }else if($("#noticeEndDt").val()=="") {
                    alert("공지종료일은 필수 입력 항목입니다.");
                    return false;
                }else if($("#noticeContent").val()=="") {
                    alert("내용은 필수 입력 항목입니다.");
                    return false;
                }else if(stDt>endDt) {
                    alert("공지기간을 From-To로 입력하십시오.");
                    return false;
                }

                else {
                    if( $("#noticeNo").val()!=0){
                        noticeNotice.update();
                    }else {
                        noticeNotice.save();
                    }
                }
            }
        });

        //삭제버튼이벤트
        $("#btnDeleteNotice").on("click", function () {
            if (noticeNoticeGridOptions.api.getSelectedRows().length > 0) {
                var chk = confirm("삭제하시겠습니까?");
                if (chk == true) {
                    noticeNotice.delete();
                }
            } else {
                alert("삭제할 대상을 선택해주세요");
            }
        });
    },  //init() End


    //전체검색
    findAll : function () {
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAll'}).then(function(data) {
            // data.forEach( function (j){
            //     noticeNoticeQuickGridOptions.api.setRowData(data);
            //     alert(j.noticeTitle)
            //
            // })
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지기간으로 검색
    findAllByDate : function () {
        var searchNoticeStartDt =parseInt($("#searchNoticeStartDt").val().replaceAll("-", ""));
        var searchNoticeEndDt =parseInt($("#searchNoticeEndDt").val().replaceAll("-", ""));
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findByDate/'+searchNoticeStartDt+'/'+searchNoticeEndDt}).then(function(data) {
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);

        });
    },

    //공지제목으로 검색
    findAllByTitle : function(){
        var searchNoticeTitle = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findByTitle/'+searchNoticeTitle}).then(function(data){
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지 내용으로 검색
    findAllByContent : function(){
        var searchNoticeContent = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findByContent/'+searchNoticeContent}).then(function(data) {
            console.log(data)
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지제목+공지내용+작성자로 검색
    findAllByTitleOrContentOrCreId : function(){
        var searchNoticeTitleOrContentOrCreId = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAllByTitleOrContentOrCreId/'+searchNoticeTitleOrContentOrCreId}).then(function(data) {
            console.log(data)
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지기간+공지제목+공지내용+작성자로 검색
    findAllByDateAndTitleOrContentOrCreId : function(){
        var searchNoticeStartDt =parseInt($("#searchNoticeStartDt").val().replaceAll("-", ""));
        var searchNoticeEndDt =parseInt($("#searchNoticeEndDt").val().replaceAll("-", ""));
        var searchNoticeTitleOrContentOrCreId = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAllByDateAndTitleOrContentOrCreId/'+searchNoticeStartDt+'/'+searchNoticeEndDt+'/'+searchNoticeTitleOrContentOrCreId}).then(function(data) {
            console.log(data)
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지기간+공지제목으로 검색
    findAllByDateAndTitle : function(){
        var searchNoticeStartDt =parseInt($("#searchNoticeStartDt").val().replaceAll("-", ""));
        var searchNoticeEndDt =parseInt($("#searchNoticeEndDt").val().replaceAll("-", ""));
        var searchNoticeTitle = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAllByDateAndTitle/'+searchNoticeStartDt+'/'+searchNoticeEndDt+'/'+searchNoticeTitle}).then(function(data) {
            console.log(data)
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지기간+공지내용으로 검색
    findAllByDateAndContent : function(){
        var searchNoticeStartDt =parseInt($("#searchNoticeStartDt").val().replaceAll("-", ""));
        var searchNoticeEndDt =parseInt($("#searchNoticeEndDt").val().replaceAll("-", ""));
        var searchNoticeContent = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAllByDateAndContent/'+searchNoticeStartDt+'/'+searchNoticeEndDt+'/'+searchNoticeContent}).then(function(data) {
            console.log(data)
            data.forEach( function (k){
                k.noticeStartDt=k.noticeStartDt.toString().substring(0,4) + "-" +k.noticeStartDt.toString().substring(4,6)+ "-"+k.noticeStartDt.toString().substring(6,8)
                k.noticeEndDt=k.noticeEndDt.toString().substring(0,4) + "-" +k.noticeEndDt.toString().substring(4,6)+ "-"+k.noticeEndDt.toString().substring(6,8)
            })
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //저장함수 ( noticeNo가 PK이자 자동증가값이라서 신규작성할 경우에는 formDatas에 넣으면 notNull인데 null드갔다 오류남
    //        근데또 formDatas에 안넣자니 수정할경우에는  PK인 noticeNo를 빼고 넘기면 신규로 인식해버림.. 그래서 걍
    //        save함수랑 update함수로 나눔)
    save(){
        var formDatas = {
            // noticeNo: $("#noticeNo").val(),
            noticeTitle: $("#noticeTitle").val(),
            noticeContent: $("#noticeContent").val(),
            noticeStartDt: parseInt($("#noticeStartDt").val().replaceAll("-", "")),
            noticeEndDt: parseInt($("#noticeEndDt").val().replaceAll("-", "")),
            noticeCreId: $("#noticeCreId").val(),

        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeNotice/saveNotice',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="save"){
                alert("공지사항이 신규등록되었습니다.")
                noticeNotice.findAll();
                noticeNoticeGridOptions.api.setRowData(null)
            }
        });
    }, //save() END

    //수정함수
    update(){
        var formDatas = {
            noticeNo: $("#noticeNo").val(),
            noticeTitle: $("#noticeTitle").val(),
            noticeContent: $("#noticeContent").val(),
            noticeStartDt: parseInt($("#noticeStartDt").val().replaceAll("-", "")),
            noticeEndDt: parseInt($("#noticeEndDt").val().replaceAll("-", "")),
        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeNotice/saveNotice',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="update"){
                alert("구축사례 정보가 수정되었습니다.")
                noticeNotice.findAll();
                noticeNoticeGridOptions.api.setRowData(null)
            }
        });
    }, //update() END


    //삭제함수
    delete(){
        var selectedRows = noticeNoticeGridOptions.api.getSelectedRows();
        $.ajax({
            type: 'DELETE',
            url : '/web/notice/noticeNotice/deleteNotice',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(selectedRows)
        }).done(function (){
            alert("삭제되었습니다.");
            noticeNotice.findAll();
        }).fail(function (error){

        });


    }, //delete() END

    setData: function (data) {

        $("#creId").val(data.creId);
        $("#noticeNo").val(data.noticeNo);
        $("#noticeTitle").val(data.noticeTitle);
        $("#noticeContent").val(data.noticeContent);
        $("#noticeStartDt").val(data.noticeStartDt);
        $("#noticeEndDt").val(data.noticeEndDt);
    },

} //noticeNotice END

var noticeNoticeGridOptions = {
    columnDefs: [
        {headerName: "공지번호", field: 'noticeNo', editable: false, width: 10,hide : true}
        , {headerName: "작성자", field: 'noticeCreId', editable: false, width: 100}
        , {headerName: "시작일", field: 'noticeStartDt', editable: false, width: 140}
        , {headerName: "종료일", field: 'noticeEndDt', editable: false, width: 140}
        , {headerName: "제목", field: 'noticeTitle', editable: false, width: 400}
        , {headerName: "내용", field: 'noticeContent', editable: false, width: 800}
        // , {headerName: "첨부파일", field: 'test', editable: false, width: 100}
    ],

    //가로스크롤바 비활성화
    suppressHorizontalScroll: true,
    //기본 컬럼 옵션 설정
    defaultColDef: {
        cellStyle: {textAlign: 'center'},
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: false,                   //상단 필터 여부(항상 떠있는지)
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
        noticeNotice.setData(event.data)
        $("#noticeNo").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeNo);
        $("#noticeCreId").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeCreId);
        $("#noticeStartDt").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeStartDt);
        $("#noticeEndDt").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeEndDt);
        $("#noticeTitle").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeTitle);
        $("#noticeContent").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeContent);
    },
    onGridReady(event) {
        noticeNotice.findAll();
        event.api.sizeColumnsToFit();

    }
} // 그리드옵션 End

// //업로드할 파일 정보 추출 (아직 구현못함 )
// window.addEventListener('DOMContentLoaded',function( ){
//
//     document.getElementById('file').addEventListener('change',function( ){
//
//         var inputs = document.getElementById('file').files;
//         for(let input of inputs){
//
//             console.log('파일타입:'+input.type);
//
//             console.log('파일명:'+input.name);
//
//             console.log('파일사이즈:'+input.size);
//
//             console.log('파일갱신일:'+input.lastModifiedDate);
//         }
//     })
// });

notice.init();

