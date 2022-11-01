const REST_LOG_ERROR_URL = 'api/log/error'
const logError = {
    init() {
        grid.makeColumn(logError_gridOptions, "logError_grid");

    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_LOG_ERROR_URL,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            logError_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },
}
let logError_gridOptions = {
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
        logError.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}

logError.init();