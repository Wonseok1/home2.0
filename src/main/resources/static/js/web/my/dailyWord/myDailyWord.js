const myDailyWord = {
    init() {
        const _this = this;

        grid.makeColumn(dailyUseWords_gridOptions, "dailyUseWords_grid");

        $("#myDailyWord_btnNew").on("click", function () {
            myDailyWord.clear();
        });
        $("#myDailyWord_btnSave").on("click", function () {
            myDailyWord.saveDailyWords();
        });
        $("#myDailyWord_btnDelete").on("click", function () {
            myDailyWord.deleteDailyWords();
        });




    },

    addNewRow() {
        let newRow = {

        }
        dailyUseWords_gridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },

    clear(){
        $("#dailyUseWordTitle").val("");
        $("#dailyUseWordContent").val("");
        $("#dailyUseWordUseYn").val("");
        $("#dailyUseWordOrdNo").val("");
        $("#dailyWordsPk").val("");
    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_MY_DAILYWORD_URL+ '/findAll',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            dailyUseWords_gridOptions.api.setRowData(data);
            console.log("data = ",data);
        }).fail(function (error) {
        });
    },

    saveDailyWords() {

        var myDailyWordData = {
            dailyUseWordTitle                : dailyUseWordTitle.value   ,
            dailyUseWordContent              : dailyUseWordContent.value ,
            useYn                            : dailyUseWordUseYn.value  ,
            ordNo                            : dailyUseWordOrdNo.value  ,
            dailyWordsPk                     : dailyWordsPk.value
        }
        console.log("저장함수실행");
        console.log("myDailyWordData = ",myDailyWordData)
        $.ajax({
            type: 'POST',
            url: REST_MY_DAILYWORD_URL + '/saveDailyWords',
            data: JSON.stringify(myDailyWordData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인"));
            myDailyWord.findAll();
        }).fail(function (error) {
        });
    },

    deleteDailyWords() {
        var myDailyWordData = {
            dailyUseWordTitle                : dailyUseWordTitle.value   ,
            dailyUseWordContent              : dailyUseWordContent.value ,
            useYn                            : dailyUseWordUseYn.value  ,
            ordNo                            : dailyUseWordOrdNo.value  ,
            dailyWordsPk                     : dailyWordsPk.value
        }
        console.log("myDailyWordData = ",myDailyWordData)
        $.ajax({
            type: 'DELETE',
            url: REST_MY_DAILYWORD_URL + '/deleteDailyWords',
            data: JSON.stringify(myDailyWordData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            console.log("data")
            console.log(data)
            itzAlert.notice(itzAlert.makeMsgJson("삭제 완료", "삭제되었습니다.", "확인"));
            myDailyWord.findAll();
        }).fail(function (error) {
        });
    }



}
let dailyUseWords_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        myDailyWord.findAll();
    },
    onRowClicked(event) {

        $("#dailyUseWordTitle").val(event.data.dailyUseWordTitle);
        $("#dailyUseWordContent").val(event.data.dailyUseWordContent);
        $("#dailyUseWordUseYn").val(event.data.useYn);
        $("#dailyUseWordOrdNo").val(event.data.ordNo);
        $("#dailyWordsPk").val(event.data.dailyWordsPk);
        console.log("event.data.dailyWordsPk")
        console.log(event.data.dailyWordsPk)
    }
}

myDailyWord.init();