

const systemApi = {
    init(){
        const _this = this;
        grid.makeColumn(systemApi_gridOptions, "systemApi_grid");

        systemApi_btnNew.onclick = function () {
            _this.addNewRow();
        };
        systemApi_btnSave.onclick = function () {
            _this.save();
        };
        systemApi_btnDelete.onclick = function () {
            _this.delete();
        };
    },
    addNewRow() {
        let newRow = {

        }
        systemApi_gridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },
    save() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_API_URL,
            data: JSON.stringify(systemApi_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemApi.findAll();
        }).fail(function (error) {
        });
    },
    delete() {
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_API_URL,
            data: JSON.stringify(systemApi_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemApi.findAll();
        }).fail(function (error) {
        });

    },
    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_API_URL ,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemApi_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    }
}



let systemApi_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemApi.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}
systemApi.init()