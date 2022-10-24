const REST_SYSTEM_COMMONCD_URL = '/api/system/commoncd'
const systemCommoncd = {
    init() {
        const _this = this;
        grid.makeColumn(systemCommonCdInfo_gridOptions, "systemCommonCdInfo_grid");

        grid.makeColumn(systemCommoncdDtl_gridOptions, "systemCommoncdDtl_grid");


        $("#systemCommoncd_btnInfoNew").on("click", function () {
            systemCommoncd.addCommoncd();
        });

        $("#systemCommoncd_btnInfoRefresh").on("click", function () {
            systemCommoncd.findCommoncd()
            systemCommoncdDtl_gridOptions.api.setRowData(null);
        });

        $("#systemCommoncd_btnInfoSave").on("click", function () {
            systemCommoncd.saveCommoncd();
        });

        $("#systemCommoncd_btnDetailNew").on("click", function () {
            systemCommoncd.addCommoncdDetail();
        });

        $("#systemCommoncd_btnDetailRefresh").on("click", function () {
            if(systemCommonCdInfo_gridOptions.api.getSelectedRows()[0]){
                systemCommoncd.findCommoncdDetail(systemCommonCdInfo_gridOptions.api.getSelectedRows()[0].commonCd);
            }else{
                systemCommoncdDtl_gridOptions.api.setRowData(null);
            }
        });

        $("#systemCommoncd_btnDetailSave").on("click", function () {
            systemCommoncd.saveCommoncdDetail();
        });
    },

    addCommoncd() {
        var newRow = {
            useYn : true,
            ordNo : 0,
        }
        systemCommonCdInfo_gridOptions.api.updateRowData({add:[newRow], addIndex: 0});
    },

    addCommoncdDetail() {
        var newRow = {
            useYn : true,
            ordNo : 0,
            commonCd : systemCommonCdInfo_gridOptions.api.getSelectedRows()[0].commonCd
        }

        systemCommoncdDtl_gridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },

    findCommoncd() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_COMMONCD_URL ,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemCommonCdInfo_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    findCommoncdDetail(commonCd) {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_COMMONCD_URL + '/detail' ,
            contentType: 'application/json; charset=utf-8',
            data: {
                commonCd: commonCd
            },
        }).done(function (data) {
            systemCommoncdDtl_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },
    saveCommoncd() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_COMMONCD_URL  ,
            data: JSON.stringify(systemCommonCdInfo_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemCommoncd.findCommoncd();
        }).fail(function (error) {
        });
    },

    saveCommoncdDetail() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_COMMONCD_URL + '/detail' ,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(systemCommoncdDtl_gridOptions.api.getSelectedRows()),
        }).done(function (data) {
            systemCommoncd.findCommoncdDetail(systemCommonCdInfo_gridOptions.api.getSelectedRows()[0].commonCd);
        }).fail(function (error) {
        });
    }
}
let systemCommonCdInfo_gridOptions = {
    columnDefs: [],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    stopEditingWhenGridLosesFocus: true,
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemCommoncd.findCommoncd();
    },
    onRowClicked(event) {
        console.log('event.node.data', event.node.data)
        console.log('event.node.data[0]', event.node.data[0])
        if (event.node.data.commonCd) {
            systemCommoncd.findCommoncdDetail(event.node.data.commonCd)

        }
    }
}

let systemCommoncdDtl_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellEditingStopped (event) {

    },
    onGridReady() {

    },
    onRowClicked(event) {
        console.log(event)
        console.log(event.node.data)
    }
}

systemCommoncd.init();