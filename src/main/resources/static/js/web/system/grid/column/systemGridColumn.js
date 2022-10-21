
systemGridColumn = {
    init() {
        const _this = this;
        const systemGridColumn_gridInfo = document.querySelector('#systemGridColumn_gridInfo');
        new agGrid.Grid(systemGridColumn_gridInfo, systemGridColumn_infoGridOptions);

        const systemGridColumn_gridColumn = document.querySelector('#systemGridColumn_gridColumn');
        new agGrid.Grid(systemGridColumn_gridColumn, systemGridColumn_columnGridOptions);

       /* systemGridColumn_btnInfoNew.onclick = function () {
            _this.addNewRowToInfoGrid();
        };
        systemGridColumn_btnInfoSave.onclick = function () {
            _this.saveGridInfo();

        };
        systemGridColumn_btnInfoDelete.onclick = function () {

        };*/

        systemGridColumn_btnDetailNew.onclick = function () {
            _this.addNewRowToDetailGrid();
        };
        systemGridColumn_btnDetailSave.onclick = function () {
            console.log('test')
            _this.saveGridColumnDetail();
        };
        systemGridColumn_btnDetailDelete.onclick = function () {
            _this.deleteGridInfo();
        };
    },
    addNewRowToInfoGrid() {
        let newRow = {
            flexYn: false,
            useYn: true,
            ordNo: 0,
        }


        systemGridColumn_infoGridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },
    addNewRowToDetailGrid() {
        let newRow = {
            flexYn: true,
            sortYn: true,
            filterYn: false,
            editYn: true,
            hideYn: false,
            resizeYn : true,
            useYn: true,
            ordNo: 0,
        }

        if (systemGridColumn_infoGridOptions.api.getSelectedRows().length > 0) {
            newRow.gridId = systemGridColumn_infoGridOptions.api.getSelectedRows()[0].gridId;
        } else {
            alert("그리드를 먼저 선택하세요")
            return false;
        }

        systemGridColumn_columnGridOptions.api.updateRowData({add: [newRow], addIndex: 0});
    },
    findAllGridInfo() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/gridInfo',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemGridColumn_infoGridOptions.api.setRowData(data);
        }).fail(function (error) {
        });

    },
    findAllGridColumnInfoByGridId(gridId) {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/columnDetail',
            contentType: 'application/json; charset=utf-8',
            data: {
                gridId: gridId
            },
        }).done(function (data) {
            console.log(data);
            systemGridColumn_columnGridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },
    saveGridInfo() {
        console.log(systemGridColumn_infoGridOptions.api.getSelectedRows());
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/gridInfo',
            data: JSON.stringify(systemGridColumn_infoGridOptions.api.getSelectedRows()),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemGridColumn.findAllGridInfo();
        }).fail(function (error) {
        });
    },
    saveGridColumnDetail() {
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/columnDetail',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(systemGridColumn_columnGridOptions.api.getSelectedRows()),
        }).done(function (data) {
            systemGridColumn.findAllGridColumnInfoByGridId(systemGridColumn_infoGridOptions.api.getSelectedRows()[0].gridId);
        }).fail(function (error) {
        });
    },
    deleteGridInfo() {
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/gridInfo',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(systemGridColumn_columnGridOptions.api.getSelectedRows()),
        }).done(function (data) {
            systemGridColumn.findAllGridInfo();
        }).fail(function (error) {
        });
    },
    deleteGridColumnDetail() {
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_GRID_COLUMN_URL + '/columnDetail',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(systemGridColumn_columnGridOptions.api.getSelectedRows()),
        }).done(function (data) {
            systemGridColumn.findAllGridColumnInfoByGridId(systemGridColumn_infoGridOptions.api.getSelectedRows()[0].gridId);
        }).fail(function (error) {
        });
    },
}


systemGridColumn_infoGridOptions = {
    columnDefs: [
        { field: "gridId", headerName: "그리드ID", editable: false, },
        { field: "gridNm", headerName: "그리드 명", editable: false, },
        { field: "pageId", headerName: "화면 명", editable: false, },
        { field: "rowSelection", headerName: "줄선택", editable: false, hide: true,
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

        { field: "editType", headerName: "editType", editable: false, hide: true,
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
        { field: "useYn" , headerName: "사용여부", editable: false, hide: true,
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
        { field: "ordNo" , headerName: "정렬순서", editable: true, hide: true, },
    ],
    // default col def properties get applied to all columns
    defaultColDef: {
        sortable: true,
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: true,
    },
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemGridColumn.findAllGridInfo();
    },
    onRowClicked(event) {
        console.log(event)
        systemGridColumn.findAllGridColumnInfoByGridId(event.node.data.gridId);
    }
}


systemGridColumn_columnGridOptions = {
    columnDefs: [
        { field: "gridColumnPk", headerName: "pk", editable: true, hide: true },
        { field: "gridId", headerName: "그리드ID", editable: true, hide: true },
        { field: "gridColumn", headerName: "그리드컬럼", editable: true, pinned:"left"},
        { field: "gridColumnNm", headerName: "그리드컬럼명", editable: true, pinned:"left" },
        { field: "gridHeader", headerName: "그리드헤더", editable: true, },
        { field: "type", headerName: "type", editable: true, },

        { field: "filter", headerName: "filter", editable: true, },
        { field: "filterParams", headerName: "filterParams", editable: true, },
        { field: "cellEditor", headerName: "cellEditor", editable: true, },
        { field: "cellEditorParams", headerName: "cellEditorParams", editable: true, },
        { field: "headerTooltip", headerName: "headerTooltip", editable: true, },

        { field: "width", headerName: "width", editable: true, },
        { field: "maxWidth", headerName: "maxWidth", editable: true, },
        { field: "minWidth", headerName: "minWidth", editable: true, },
        { field: "pinned", headerName: "pinned", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = ['left', 'right'];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },},
        { field: "editYn", headerName: "editYn", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = [true, false];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },},

        { field: "hideYn", headerName: "hideYn", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = [true, false];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },},
        { field: "flexYn", headerName: "flexYn", editable: true,
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
        { field: "sortYn", headerName: "정렬가능여부", editable: true,
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
        { field: "filterYn", headerName: "필터여부", editable: true,
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
        { field: "floatingFilterYn", headerName: "필터 상단 여부", editable: true,
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
        { field: "checkBoxSelectionYn", headerName: "체크박스 여부", editable: true,
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
        { field: "resizeYn", headerName: "크기조정여부", editable: true,
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

        { field: "useYn", headerName: "사용여부", editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams(params) {
                var ext = [true, false];
                return {
                    values: ext,
                    formatValue(value) {
                        return value ;
                    },
                };
            },},
        { field: "ordNo", headerName: "정렬순서", editable: true,},
    ],

    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},

    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted

    // example event handler
    onCellClicked: params => {
        console.log('cell was clicked', params)
    },
    onGridReady() {
        // systemGridColumn.findAllGridColumnInfoByGridId();
    }
}


systemGridColumn.init();