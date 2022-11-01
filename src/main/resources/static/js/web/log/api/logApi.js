const logApi = {
    init() {
        grid.makeColumn(logApi_gridOptions, "logApi_grid");

    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_LOG_API_URL,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            logApi_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },
}
let logApi_gridOptions = {
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
        logApi.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}

logApi.init();