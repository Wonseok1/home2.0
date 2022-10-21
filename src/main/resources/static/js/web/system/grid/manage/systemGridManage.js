const systemGridManage = {
    init() {
        const _this = this;
        const systemGridColumn_gridInfo = document.querySelector('#systemGridManage_gridInfo');
        new agGrid.Grid(systemGridColumn_gridInfo, systemGridManage_gridInfoOptions);
        systemGridManage_btnNew.onclick = function () {
            _this.addNewRow();
        };
        systemGridManage_btnSave.onclick = function () {
            _this.save();
        };
        systemGridManage_btnDelete.onclick = function () {
            _this.delete();
        };
    },
    addNewRow() {
        let newRow = {
            rowSelection : 'single',
            flexYn: false,
            editType: 'fullRow',
            useYn: true,
            ordNo: 0,
        }
        systemGridManage_gridInfoOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },
    save() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_GRID_MANAGE_URL,
            data: JSON.stringify(systemGridManage_gridInfoOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemGridManage.findAll();
        }).fail(function (error) {
        });
    },
    delete() {
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_GRID_MANAGE_URL,
            data: JSON.stringify(systemGridManage_gridInfoOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemGridManage.findAll();
        }).fail(function (error) {
        });
    },
    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_GRID_MANAGE_URL ,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemGridManage_gridInfoOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    }
}



const systemGridManage_gridInfoOptions = {
    columnDefs: [
        { field: "gridId", headerName: "그리드ID", editable: true, },
        { field: "gridNm", headerName: "그리드 명", editable: true, },
        { field: "pageId", headerName: "화면 명", editable: true, },
        { field: "rowSelection", headerName: "줄선택", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = ['single', 'multiple'];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },
        },
        { field: "editType", headerName: "editType", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = ['fullRow'];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },
        },
        { field: "useYn" , headerName: "사용여부", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = [true,false];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },
        },
        { field: "ordNo" , headerName: "정렬순서", editable: true, type: 'numberColumn',  },
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemGridManage.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}


systemGridManage.init();