fileShare_Tree = "";
fileShare_object = {};
fileShare_parentFolder = "";
fileShare_parentFolder_refresh = {};
fileShare_parentFolder_delete = {};
fileShare_downloadData = {};
fileShare_downloadList = [];

const fileShare ={
    init() {
        fileShare.mkdirTree();

        $("#fileShare_refresh").on("click", function () {
            fileShare.mkdirTree();
        });

        $("#fileShare_newFolder").on("click", function () {
            fileShare.showNewFolderModal(fileShare_parentFolder);
        });

        $("#fileShare_upload").on("click", function () {
            fileShare.showUploadModal(fileShare_parentFolder);
        });

        $("#fileShare_download").on("click", function () {
            if(fileShare_downloadData !== "") {

                for (let i in fileShare_downloadList) {
                    fileShare_downloadList[i].click();
                    sleep(2000);
                }
                // fileShare.downloadFile(fileShare_downloadData);
            } else {
                alert("저장할 파일을 선택해주세요.")
            }
        });

        $("#fileShare_delete").on("click", function () {
            fileShare.delete(fileShare_parentFolder);
        });
    },

    makeDownloadLink(data){

        if (fileShare_downloadData !== "") {
            for (let i in fileShare_downloadList) {
                document.body.removeChild(fileShare_downloadList[i]);
            }
            fileShare_downloadList = [];
        }


        for(let i in data) {
            let name = data[i].id;
            let path = data[i].address.join("/");
            let link = "fileDownload1?filePath=" + path + "&fileName=" + name

            let classCheck = document.getElementsByClassName('download_'+i);

            if (classCheck.length === 0 ) {
                let downTag = document.createElement("a");
                downTag.classList.add('download_'+i);
                downTag.href = link;
                document.body.appendChild(downTag);
                fileShare_downloadList.push(downTag)
            }
        }

    },

    delete(data) {
        let name = data.id;
        let parentLevel = data.lv - 1;
        let parentData = fileShare_object["lv_"+ parentLevel];

        for(let i in parentData) {
            let childData = parentData[i].children
            for(let j in childData) {
                if(childData[j].id === name) {
                    fileShare_parentFolder_delete = [parentData[i]];
                }
            }
        }

        let parameter = {
            name: name,
            path: data.address.join("/"),
        }

        $.ajax({
            type: 'GET',
            url: REST_FILE_SHARE_URL + "/delete",
            data: parameter,
            contentType: 'application/json; charset=utf-8',
            async: false
        }).done(function (data) {
            alert("삭제되었습니다.");
            fileShare.refreshWhenDeleteFile(fileShare_parentFolder_delete);
        }).fail(function (error) {
        });
    },

    downloadFile(data) {
        $.ajax({
            type: 'GET',
            url: "/system/main/fileDownload1?filePath="+data[0].address.join("/")+"&fileName="+data[0].id,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            xhr: function () {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    //response 데이터를 바이너리로 처리한다. 세팅하지 않으면 default가 text
                    xhr.responseType = "blob";
                };
                return xhr;
            }
        }).done(function (data) {
            console.log(data)
            console.log(data)

        }).fail(function (error) {
        });

    },

    showUploadModal(parentFolder) {
        if (parentFolder === "") {
            alert("폴더를 선택해주세요.")
            return false;
        }
        let id = parentFolder.id;
        let path = parentFolder.address.join("/");
        $("#upload_file").val("");

        $("#uploadModal").removeClass("hidden");
        $("#upload_parent").val(id);

        $("#upload_btn_confirm").on("click", function () {
            $("#uploadModal").addClass("hidden");
            fileShare.upload(path);
            fileShare.clickList(fileShare_parentFolder_refresh);
        });

        $("#upload_btn_cancel").on("click", function () {
            $("#uploadModal").addClass("hidden");
        });
    },

    showNewFolderModal(parentFolder) {
        if (parentFolder === "") {
            alert("폴더를 선택해주세요.")
            return false;
        }

        let id = parentFolder.id;
        let path = parentFolder.address.join("/");

        $("#newFolderModal").removeClass("hidden");
        $("#newFolder_parent").val(id);

        $("#newFolder_btn_confirm").on("click", function () {
            $("#newFolderModal").addClass("hidden");
            let name = $("#newFolder_title").val();
            $("#newFolder_title").val("");

            if(name !== "") {
                fileShare.mkdir(path,name);
            } else {
                alert("폴더 이름을 입력해주세요.");
                $("#newFolderModal").removeClass("hidden");
            }

            fileShare.clickList(fileShare_parentFolder_refresh);
        });

        $("#newFolder_btn_cancel").on("click", function () {
            $("#newFolderModal").addClass("hidden");
        });
    },

    clickList(selected) {
        fileShare_downloadData = "";
        let addr = selected[0].address;
        let path = "/"+addr.join("/");
        let checkFolder = selected[0].id.includes(".")

        if (!checkFolder) {
            let parameter = {
                path: path,
            }

            console.log("parameter")
            console.log(parameter)

            $.ajax({
                type: 'GET',
                url: REST_FILE_SHARE_URL + "/clickList",
                data: parameter,
                contentType: 'application/json; charset=utf-8',
                async : false
            }).done(function (data) {
                console.log("file list data");
                console.log(data);
                if(data.length > 0) {
                    let tmpList = [];
                    if (data[0].includes("/")) {
                        tmpList = data[0].split("/");
                    } else if (data[0].includes("\\")) {
                        tmpList = data[0].split("\\");
                    }

                    let level = tmpList.length - 1;
                    fileShare_object['lv_' + level] = [];

                    for (let i in data) {
                        let index;
                        let fileNm;
                        let fileList;

                        if (data[0].includes("/")) {
                            index = data[i].lastIndexOf("/");
                            fileNm = data[i].substr(index+1);
                            fileList = data[i].split("/");

                        } else if (data[0].includes("\\")) {
                            index = data[i].lastIndexOf("\\");
                            fileNm = data[i].substr(index+1);
                            fileList = data[i].split("\\");
                        }

                        let tmp = new Object();
                        tmp.id = fileNm;
                        tmp.text = fileNm;
                        tmp.address = fileList;
                        tmp.lv = level;
                        fileShare_object['lv_' + level].push(tmp);
                    }

                    for (let i in fileShare_object['lv_' + (level-1)]) {
                        let id = fileShare_object['lv_' + (level-1)][i].id;
                        let add = fileShare_object['lv_' + level][0].address
                        if (id === add[(level-1)]) {
                            fileShare_object['lv_' + (level-1)][i].children =  fileShare_object['lv_' + level];
                        }
                    }

                    console.log("tree data setting");
                    console.log(fileShare_object['lv_0']);
                    fileShare.treeData(fileShare_object['lv_0']);
                }
            });
        } else {
            fileShare_downloadData = selected;
        }
    },

    refreshWhenDeleteFile(selected) {
        let addr = selected[0].address;
        let path = addr.join("/");
        let checkFolder = selected[0].id.includes(".")

        if (!checkFolder) {
            let parameter = {
                path: path,
            }

            $.ajax({
                type: 'GET',
                url: REST_FILE_SHARE_URL + "/clickList",
                data: parameter,
                contentType: 'application/json; charset=utf-8',
                async : false
            }).done(function (data) {
                if(data.length > 0) {
                    let tmpList = [];
                    if (data[0].includes("/")) {
                        tmpList = data[0].split("/");
                    } else if (data[0].includes("\\")) {
                        tmpList = data[0].split("\\");
                    }

                    let level = tmpList.length - 1;
                    fileShare_object['lv_' + level] = [];

                    for (let i in data) {
                        let index;
                        let fileNm;
                        let fileList;

                        if (data[0].includes("/")) {
                            index = data[i].lastIndexOf("/");
                            fileNm = data[i].substr(index+1);
                            fileList = data[i].split("/");

                        } else if (data[0].includes("\\")) {
                            index = data[i].lastIndexOf("\\");
                            fileNm = data[i].substr(index+1);
                            fileList = data[i].split("\\");
                        }

                        let tmp = new Object();
                        tmp.id = fileNm;
                        tmp.text = fileNm;
                        tmp.address = fileList;
                        tmp.lv = level;
                        fileShare_object['lv_' + level].push(tmp);
                    }

                    for (let i in fileShare_object['lv_' + (level-1)]) {
                        let id = fileShare_object['lv_' + (level-1)][i].id;
                        let add = fileShare_object['lv_' + level][0].address
                        if (id === add[(level-1)]) {
                            fileShare_object['lv_' + (level-1)][i].children =  fileShare_object['lv_' + level];
                        }
                    }
                    fileShare.treeData(fileShare_object['lv_0']);

                } else {
                    let preParentData = fileShare_parentFolder_delete[0];
                    let name = preParentData.id;
                    let parentLevel = preParentData.lv - 1;
                    let parentData = fileShare_object["lv_"+ parentLevel];
                    let searchFolderData = [];

                    for(let i in parentData) {
                        let childData = parentData[i].children
                        for(let j in childData) {
                            if(childData[j].id === name) {
                                searchFolderData = [parentData[i]];
                            }
                        }
                    }
                    fileShare.clickList(searchFolderData);
                }
            });
        } else {
            fileShare_downloadData = selected;
        }
    },

    mkdir(path, name) {
        let parameter = {
            path: path,
            dirNm: name,
        }

        $.ajax({
            type: 'GET',
            url: REST_FILE_SHARE_URL + "/dir",
            data: parameter,
            contentType: 'application/json; charset=utf-8',
            async : false
        }).done(function (data) {
        }).fail(function (error) {
        });

    },

    upload(path) {
        let file = document.getElementById("upload_file").files[0]

        if (validation(file)) {

            let formData = new FormData();
            formData.append("path",path);
            formData.append("file",file);

            $.ajax({
                type: 'POST',
                url: REST_FILE_SHARE_URL,
                data: formData,
                processData:false,
                contentType:false,
                async : false
            }).done(function (data) {
            }).fail(function (error) {
            });
        }

    },

    //처음 폴더 생성
    mkdirTree() {
        let data = $("#fileShare_path").val();

        let path = data.substring(1);
        let pathList = path.split("/");
        for (let i in pathList) {
            fileShare_object['lv_'+i] = [];
            let tmp = new Object();
            let num = Number(i)+1;
            tmp.id = pathList[i];
            tmp.text = pathList[i];
            tmp.address = pathList.slice(0,num);
            tmp.lv = i;
            fileShare_object['lv_'+i].push(tmp);
            if (i > 0) {
                fileShare_object['lv_'+ (i-1)][0].children = fileShare_object['lv_'+i];
            }
        }
        fileShare.treeData(fileShare_object['lv_0']);
    },

    treeData(data) {

        fileShare_Tree = new Tree('#fileShare_fileTree', {

            data:  data,

            checkBoxOptions : "single", //single , multi, onlyClick

            beforeLoad: function (rawData) {
                function formatData() {
                    // do some format
                }
                return formatData(rawData);
            },
            loaded: function () {
            },

            onChange: function () {
                console.log("this.selectedNodes",this.selectedNodes);

                fileShare_parentFolder = this.selectedNodes[0];
                fileShare_parentFolder_refresh = this.selectedNodes

                if(this.selectedNodes.length > 0){
                    fileShare.clickList(this.selectedNodes);

                    for(let i in this.selectedNodes) {
                        if(this.selectedNodes[i].id.includes(".")) {
                            fileShare.makeDownloadLink(this.selectedNodes);
                        }
                    }
                }


            },
        })
        common.putIconTreeAndTextSizeSmall(fileShare_Tree, "fileShare_fileTree");
    },


}

/* 첨부파일 검증 -fileTypes: 첨부허용할 첨부파일 확장자 */
function validation(obj){
    const fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif', 'application/haansofthwp', 'application/x-hwp','text/plain','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'];
     if (!fileTypes.includes(obj.type)) {
         alert(obj.type)
         alert("첨부가 불가능한 파일은 제외되었습니다.");
         return false;
    } else {
         return true;
    }
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

fileShare.init();