var delParentId = [];

var common = {
    loadPage(menuInfo, hiddenYn) {
        $.ajax({
            type: 'GET',
            url:"/getPage" + menuInfo.menuParentUrl + menuInfo.menuUrl +"/"+menuInfo.menuPageId,
            contentType: 'application/json; charset=utf-8'
        }).done(function (pageHtml) {
            if (pageHtml) {
                if (hiddenYn) {
                    common.appendPage(pageHtml, menuInfo, true);
                }else{
                    common.appendPage(pageHtml, menuInfo, false);
                }
            }
        }).fail(function (error) {
        });
    },
    loadPopupPage() {

    },
    loadModalPopupPage() {

    },

    /**
     * pageNm : 해당 페이지 (String값으로)
     * tree : tree명
     * */
    makeOrgList(pageNm, tree) {
        let orgList = [];
        let orgCheckBox = false;
        let checkbox1 = pageNm+'_checkbox';

        if ($('#'+checkbox1).hasClass('bg-indigo-600')) {
            orgCheckBox = true;
        }

        if (tree.selectedNodes.length === 0 && orgCheckBox === true) {
            itzAlert.error(itzAlert.makeMsgJson("조직 선택 필수", "조직을 선택해주세요.", "확인") );

        } else if (orgCheckBox === false) {
            orgList = common.findOrgListByAuth();

        } else {
            tree.selectedNodes.forEach(function (treeNode) {
                orgList.push(treeNode.id);
            });
            orgList.push('checkTree');
        }

        return orgList;
    },

    // 해당권한이 가지고 있는 조직리스트 (=>검색조건에서 조직 선택안했을때 사용)
    findOrgListByAuth() {
        let orgList = [];
        $.ajax({
            type: 'GET',
            url: REST_COMMON_ORG_URL,
            contentType: 'application/json; charset=utf-8',
            async : false
        }).done(function (data) {

            data.forEach(function (orgData){
                orgList.push(orgData.orgId)
            })

        }).fail(function (error) {
        });
        return orgList;
    },

    // 검색조건에 조직버튼과 트리만들기
    /**
     * page : 해당 페이지
     * pageNm : 해당 페이지 (String값으로)
     * */
    loadOrgButtonAndTreeData(page,pageNm) {
        let checkYn = false;
        let checkbox1 = pageNm+'_checkbox';
        let checkbox2 = pageNm+'_checkbox2';
        let divTree = pageNm+'_tree';

        common.findTreeByOrgAuth(page);

        $('#'+checkbox1).click(function () {
            if (checkYn === false) {
                checkYn = true;
                $('#'+checkbox1).removeClass('bg-gray-200');
                $('#'+checkbox1).addClass('bg-indigo-600');
                $('#'+checkbox2).removeClass('translate-x-0');
                $('#'+checkbox2).addClass('translate-x-5');
                $('#'+divTree).removeClass('hidden');
            } else if (checkYn === true) {
                checkYn = false;
                $('#'+checkbox1).removeClass('bg-indigo-600');
                $('#'+checkbox1).addClass('bg-gray-200');
                $('#'+checkbox2).removeClass('translate-x-5');
                $('#'+checkbox2).addClass('translate-x-0');
                $('#'+divTree).addClass('hidden');
            }
        })
    },
    findTreeByOrgAuth(page) {
        let objectType = {};
        $.ajax({
            type: 'GET',
            url: REST_COMMON_ORG_URL,
            contentType: 'application/json; charset=utf-8',
            async: false
        }).done(function (data) {

            objectType = common.loadTreeData(data,"org");
            page.treeData(objectType,"");
            console.log("objectTypeobjectType = ",objectType)

        }).fail(function (error) {
        });
        return objectType;
    },

    // 공통코드 셀렉트박스로 만들기 (selectboxID랑 공통코드 pk를 파라미터로)
    /**
     * selectBoxId : html select의 ID
     * commonCd : 공통코드의 대분류 코드
     * defaultNm : 미선택시의 option 보이는값
     * defaultValue : 미선택시의 option value
     * */
    loadSelectBoxByCommonCd(selectBoxId, commonCd, defaultNm, defaultValue) {
        $.ajax({
            type: 'GET',
            url:REST_COMMON_CODE_URL + '/' + commonCd,
            contentType: 'application/json; charset=utf-8'
        }).done(function (code) {
            if (defaultNm) {
                $("#"+selectBoxId).append('<option value="'+ defaultValue +'">' + defaultNm + '</option>');
            }

            for(let i in code) {
                $("#"+selectBoxId).append('<option value="'+ code[i].commonCdDetail +'">' + code[i].commonCdDetailNm + '</option>');
            }

        }).fail(function (error) {
        });
    },

    //treejs data 가공하기
    /**
     * data : ajax.done 후 data
     * type : 메뉴(menu) or 조직(org)
     * allAndOne : 전체, 자신 체크박스 여부
     * */
    loadTreeData(data,type,allAndOne) {

        let object = {};
        delParentId = [];

        let data_length = 0;
        let putArrObj = {};
        let lastLv = 0;
        let endLv = 0;

        let typeId = type+"Id";
        let typeNm = type+"Nm";
        let typeParentId = type+"ParentId";
        let typeLv = type+"Lv";

        data_length = data[data.length - 1][typeLv] + 1;
        lastLv = data[data.length - 1][typeLv];
        endLv = lastLv - 2;

        for (let i = data[0][typeLv]; i < data_length; i++) {
            object['lv_' + i] = [];

            if (allAndOne === true) {
                if (i === 0) {
                    for(let a=0; a<2; a++) {
                        let allAndOne = new Object();
                        allAndOne.id = a.toString();
                        allAndOne.lv = 0;
                        if (a === 0) {
                            allAndOne.text = "전체";
                        } else {
                            allAndOne.text = "자신";
                        }
                        object['lv_' + i].push(allAndOne);

                    }
                }
            }

            data.forEach(function (item) {
                let tmp = new Object();
                if (item[typeLv] == i) {
                    tmp.id = item[typeId];
                    tmp.text = item[typeNm];
                    tmp.parentId = item[typeParentId];
                    tmp.lv = item[typeLv];
                    object['lv_' + i].push(tmp);
                }
            })
        }

        for (let i in object['lv_' + (lastLv - 1)]) {
            putArrObj['lv_' + lastLv] = [];

            for (let j in object['lv_' + lastLv]) {
                if (object['lv_' + (lastLv - 1)][i].id === object['lv_' + lastLv][j].parentId) {
                    let tmp = new Object();
                    tmp.id = object['lv_' + lastLv][j].id;
                    tmp.text = object['lv_' + lastLv][j].text;
                    tmp.parentId = object['lv_' + lastLv][j].parentId;
                    tmp.lv = object['lv_' + lastLv][j].lv;
                    putArrObj['lv_' + lastLv].push(tmp);
                }
            }
            object['lv_' + (lastLv - 1)][i].children = putArrObj['lv_' + lastLv]
        }
        while (endLv >= 0) {
            for (let k in object['lv_' + endLv]) {

                putArrObj['lv_' + (endLv + 1)] = [];

                for (let n in object['lv_' + (endLv + 1)]) {
                    if (object['lv_' + endLv][k].id === object['lv_' + (endLv + 1)][n].parentId) {
                        putArrObj['lv_' + (endLv + 1)].push(object['lv_' + (endLv + 1)][n])
                    }
                }
                object['lv_' + endLv][k].children = putArrObj['lv_' + (endLv + 1)]
            }
            endLv--;
        }

        if(type === "menu") {
            let endLength = data_length-1;

            for (let t=0; t < endLength; t++) {
                for (let r in object['lv_'+t]){
                    if(object['lv_'+t][r].children.length > 0) {
                        delParentId.push(object['lv_'+t][r].id);
                    }
                }
            }
        }


        return object['lv_' + data[0][typeLv]];

    },

    // treejs에 아이콘 넣기 및 텍스트 사이즈 줄이기
    /**
     * tree : tree객체 ID
     * divTree : html tree ID
     * */
    putIconTreeAndTextSizeSmall(tree, divTree) {
        let nodeList = tree.nodesById;
        let nodeList_length = 0;
        let treeNode = $("#"+divTree)[0];
        let parent = treeNode.querySelectorAll('.treejs-label');

        for(let j in nodeList) {
            let level = nodeList[j].lv;

            let element = document.createElement('i');

            if (level === 0) {
                element.classList.add('fa-solid', 'fa-folder-open', 'pr-1', 'text-gray-400');
            } else if (level === 1) {
                element.classList.add('fa-regular', 'fa-folder-open', 'pr-1', 'text-gray-400');
            } else {
                element.classList.add('fa-solid', 'fa-folder', 'pr-1', 'text-gray-400');
            }
            parent[nodeList_length].insertBefore(element, parent[nodeList_length].firstChild);

            nodeList_length++;
        }

        for(let num=0; num<parent.length; num++) {
            parent[num].classList.add('text-xs');
        }
    },

    appendPage(pageHtml, menuInfo, hiddenYn) {
        let pageDivHtml = "";
        if (hiddenYn) {
            pageDivHtml = `<div id="page_${menuInfo.menuId}" class=" w-full bg-red overflow-y-auto h-full hidden"><div/>`;
        }else{
            pageDivHtml = `<div id="page_${menuInfo.menuId}" class=" w-full bg-red overflow-y-auto h-full"><div/>`;

        }
        $("#divPage").append(pageDivHtml);

        let pageJsHtml = `<script src="/js/web${menuInfo.menuParentUrl}${menuInfo.menuUrl}/${menuInfo.menuPageId}.js"></script>`
        let pageCssHtml = `<script src="/css/web${menuInfo.menuParentUrl}${menuInfo.menuUrl}/${menuInfo.menuPageId}.css"></script>`
        $("#page_"+menuInfo.menuId).append(pageCssHtml) ;
        $("#page_"+menuInfo.menuId).append(pageHtml) ;
        $("#page_"+menuInfo.menuId).append(pageJsHtml) ;
    },

    getTimeStringSeconds(seconds){
        var hour, min, sec

        hour = parseInt(seconds/3600);
        min = parseInt((seconds%3600)/60);
        sec = seconds%60;

        if (hour.toString().length==1) hour = "0" + hour;
        if (min.toString().length==1) min = "0" + min;
        if (sec.toString().length==1) sec = "0" + sec;

        return hour + ":" + min + ":" + sec;

    },
}


$(document).ajaxStart(function(event,xhr,options) {

    $("#loader").removeClass("hidden");

});

$(document).ajaxSend(function(e, xhr, options) {
    var token = $("meta[name='csrf-token']").attr("content");
    xhr.setRequestHeader("X-CSRF-Token", token);
});

$(document).ajaxStop(function(event,xhr,options) {
    $("#loader").addClass("hidden");
});
