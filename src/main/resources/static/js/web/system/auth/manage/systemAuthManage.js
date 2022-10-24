
const systemAuthManage = {
    init() {
        const _this = this;
        grid.makeColumn(systemAuthManage_gridOptions, "systemAuthManage_grid");

        systemAuthManage_btnNew.onclick = function () {
            _this.addNewRow();
        };
        systemAuthManage_btnSave.onclick = function () {
            _this.save();
        };
        systemAuthManage_btnDelete.onclick = function () {
            _this.delete();
        };
    },
    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_MANAGE_URL,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemAuthManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },
    addNewRow() {
        let newRow = {
            useYn: true,
            ordNo: 0,
        }
        systemAuthManage_gridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },
    save() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_AUTH_MANAGE_URL ,
            data: JSON.stringify(systemAuthManage_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemAuthManage.findAll();
        }).fail(function (error) {
        });
    },
    delete() {
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_AUTH_MANAGE_URL ,
            data: JSON.stringify(systemAuthManage_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemAuthManage.findAll();
        }).fail(function (error) {
        });
    }
}



let systemAuthManage_gridOptions = {
    columnDefs: [
    ],
    defaultColDef: {
        sortable: true,                         //정렬 가능 여부
    },
    localeText: AG_GRID_LOCALE_KO,
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemAuthManage.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}


systemAuthManage.init();