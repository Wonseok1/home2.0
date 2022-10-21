var systemGridHeaderManage ={
    init() {
        const systemGridManage_gridInfo = document.querySelector('#systemGridManage_gridInfo');
        new agGrid.Grid(systemGridManage_gridInfo, systemGridManage_gridInfoOptions);

        const systemGridManage_gridDetail = document.querySelector('#systemGridManage_gridDetail');
        new agGrid.Grid(systemGridManage_gridDetail, systemGridManage_gridDetailOptions);

        systemGridManage_btnInfoNew.onclick = function () {
            systemGridColumnManage.addNewRowToInfoGrid();
        };
        systemGridManage_btnInfoSave.onclick = function () {

        };
        systemGridManage_btnInfoDelete.onclick = function () {

        };
        systemGridManage_btnInfoRefresh.onclick = function () {

        };

        systemGridManage_btnDetailNew.onclick = function () {
            systemGridColumnManage.addNewRowToDetailGrid();
        };
        systemGridManage_btnDetailSave.onclick = function () {

        };
        systemGridManage_btnDetailDelete.onclick = function () {

        };
        systemGridManage_btnDetailRefresh.onclick = function () {

        };
    },
    addNewRowToInfoGrid() {
        let newRow = {
            useYn: 'Y',
            ordNo : 0,
        }


        systemGridManage_gridInfoOptions.api.updateRowData({add: [newRow], addIndex:0});
    },
    addNewRowToDetailGrid() {
        let newRow = {
            useYn: 'Y',
            ordNo : 0,
        }

        if (systemGridManage_infoGridOptions.api.getSelectedRows().length > 0) {
            newRow.gridId = systemGridManage_gridInfoOptions.api.getSelectedRows()[0].gridId;
        }else{
            alert("그리드를 먼저 선택하세요")
            return false;
        }

        systemGridManage_gridDetailOptions.api.updateRowData({add: [newRow], addIndex:0});
    }
}


const systemGridHeader_gridInfoOptions = {
    columnDefs: [
        { field: "gridId", headerName: "그리드ID" },
        { field: "gridNm", headerName: "그리드 명" },
        { field: "pageId", headerName: "화면 명" },
        { field: "flexYn", headerName: "flex여부" },
        { field: "useYn" , headerName: "사용여부"},
        { field: "ordNo" , headerName: "정렬순서"},
    ],

    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},

    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted

    // example event handler
    onCellClicked: params => {
        console.log('cell was clicked', params)
    }
}


const systemGridHeader_gridDetailOptions = {
    columnDefs: [
        { field: "gridColumnPk", headerName: "pk" },
        { field: "gridId", headerName: "그리드ID" },
        { field: "gridColumn", headerName: "그리드컬럼" },
        { field: "gridColumnNm", headerName: "그리드컬럼명" },
        { field: "ordNo", headerName: "정렬순서" },
        { field: "useYn", headerName: "사용여부",
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = ["Y","N"];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },},
    ],

    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},

    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted

    // example event handler
    onCellClicked: params => {
        console.log('cell was clicked', params)
    }
}


systemGridHeaderManage.init();