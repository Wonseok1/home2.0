/*
* columnDefs: [
    {
        headerName: 'Group A',
        children: [
            { field: 'athlete' },
            { field: 'sport' },
            { field: 'age' }
        ]
    }
],
* */


const grid = {
    makeColumn(gridOption, id, rowIdColumn) {
        $.ajax({
            type: 'GET',
            url: REST_COMMON_GRID_URL + '/column',
            contentType: 'application/json; charset=utf-8',
            data: {
                gridId: id
            },
        }).done(function (gridColumnList) {
            if (gridColumnList) {
                gridColumnList.forEach(function (columnInfo) {

                    if (columnInfo.useYn) {
                        if (columnInfo.gridColumn == 'default') {
                            console.log("default", columnInfo)
                            //grid Default option 추가
                            let defaultColumnDef = {
                                hide            : columnInfo.hideYn,
                                minWidth        : columnInfo.minWidth,
                                maxWidth        : columnInfo.maxWidth,
                                width           : columnInfo.width,
                                editable        : columnInfo.editYn,
                                sortable        : columnInfo.sortYn,
                            }

                            if (columnInfo.filterYn) {
                                defaultColumnDef.filter = columnInfo.filter;
                                if (columnInfo.floatingFilterYn) {
                                    defaultColumnDef.floatingFilter = columnInfo.floatingFilterYn
                                }
                                if (columnInfo.filterParams) {
                                    defaultColumnDef.filterParams = {
                                        buttons: columnInfo.filterParams.split(','),
                                        closeOnApply : true,
                                    };
                                }
                            }
                            if (columnInfo.flexYn) {
                                defaultColumnDef.flex =  1;
                            }

                            if (columnInfo.type) {
                                var typeList = columnInfo.type.split(',');
                                if (typeList.length == 1) {
                                    defaultColumnDef.type = typeList[0];
                                } else {
                                    defaultColumnDef.type = typeList;
                                }
                            }


                            gridOption.defaultColDef = defaultColumnDef;
                        }else{
                            let columnDef = {
                                field           : columnInfo.gridColumn,
                                headerName      : columnInfo.gridColumnNm,
                                hide            : columnInfo.hideYn,
                                minWidth        : columnInfo.minWidth,
                                maxWidth        : columnInfo.maxWidth,
                                width           : columnInfo.width,
                                editable        : columnInfo.editYn,
                                sortable        : columnInfo.sortYn,
                            }
                            columnDef.pinned =  columnInfo?.pinned

                            console.log('filterYn', columnInfo.filterYn)
                            if (columnInfo.filterYn) {
                                columnDef.filter = columnInfo.filter;
                                if (columnInfo.filterParams) {
                                    columnDef.filterParams = {
                                        buttons: columnInfo.filterParams.split(','),
                                        closeOnApply : true,
                                    };
                                }
                                if (columnInfo.floatingFilterYn) {
                                    columnDef.floatingFilter = columnInfo.floatingFilterYn
                                }
                            }

                            if (columnInfo.cellEditor) {
                                columnDef.cellEditor = columnInfo.cellEditor;
                                columnDef.cellEditorParams = function (params) {
                                    return{
                                        values: columnInfo.cellEditorParams.split(','),
                                        formatValue: function (value) {
                                            return value;
                                        }
                                    }
                                };
                            }
                            if (columnInfo.flexYn) {
                                columnDef.flex =  1;
                            }
                            if (columnInfo.type) {
                                var typeList = columnInfo.type.split(',');
                                if (typeList.length == 1) {
                                    columnDef.type = typeList[0];
                                } else {
                                    columnDef.type = typeList;
                                }
                            }

                            gridOption.columnDefs.push(columnDef);
                        }
                    }

                    if (rowIdColumn) {
                        gridOption.getRowId = params => params.data[rowIdColumn ];
                    }

                });
            }

            const gridDiv = document.querySelector('#'+id);
            new agGrid.Grid(gridDiv, gridOption);
        }).fail(function (error) {
        });

    }
}


const agGridCommonOption = {
    defaultColDef: {
        minWidth: 100,                           //컬럼 최소길이
        width: 130,                             //컬럼 길이
        flex: 1,
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: true,                   //상단 필터 여부(항상 떠있는지)
        resizable: true,                        //크기 조절 가능 여부
        sortable: true,                         //정렬 가능 여부
    },
    // localeText: AG_GRID_LOCALE_KO,
    columnTypes: {
        numberColumn: {filter: 'agNumberColumnFilter'},
        nonEditableColumn: {editable: false},
        dateColumnWithTextFilter: {// 데이트 타입 T 제거 해주며, 검색을 텍스트로 가능
            cellRenderer: function (data) {
                return data.value.replace(/T/gi, ' ').split(".")[0];
            },
        },
    },
}