historyManage = {
    init() {
        grid.makeColumn(historyManage_gridOptions, "historyManage_grid");
        //클릭이벤트
        historyManage_btnNew.onclick = function () {
            historyManage.addRow()
        }
        historyManage_btnSave.onclick = function () {
            historyManage.save()
        }
        historyManage_btnDelete.onclick = function () {
            historyManage.delete()
        }
    },

    addRow() {
        let newRow = {
            useYn: true,
            ordNo: 0
        }
        historyManage_gridOptions.api.updateRowData({add: [newRow], addIndex: 0})
    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_COMPANY_HISTORY_MANAGE_URL,
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            historyManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    save(){
        $.ajax({
            type: 'POST',
            url: REST_COMPANY_HISTORY_MANAGE_URL,
            data: JSON.stringify(historyManage_gridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            historyManage.findAll()
        }).fail(function (error) {
        });
    },

    delete(){
        $.ajax({
            type: 'DELETE',
            url: REST_COMPANY_HISTORY_MANAGE_URL,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(historyManage_gridOptions.api.getSelectedRows()),
        }).done(function () {
            historyManage.findAll()
        }).fail(function (error) {
        });
    }


}

let historyManage_gridOptions = {
        columnDefs: [
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
            historyManage.findAll();
        },
        onRowClicked(event) {
        }
}

historyManage.init();