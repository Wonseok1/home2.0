systemIcon_searchIconList = [];

const systemIcon = {
    init() {
        this.readTextFile("/lib/fontawesome/css/fontawesome.css");
        document.body.style.overflowY = "hidden";
    },
    readTextFile(file) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    let allText = rawFile.responseText;
                    const regex = new RegExp("\.(.*?)\{", "gi");
                    const iconList = allText.match(regex);

                    iconList.forEach(function (icon) {
                        let deleteIndex = icon.indexOf(':');
                        if (deleteIndex > 0){
                            let iconClass = icon.substr(0, deleteIndex);
                            if(!(iconClass.includes('@'))) {
                                iconClass = iconClass.replace("\.","");
                                systemIcon_searchIconList.push(iconClass);
                                let tempHtml = ` <div id="${iconClass}" class="w-12 h-12 m-1 py-1 px-1.5 inline-block flex-shrink-0 border-2 border-gray-300 focus:ring-indigo-800 focus:border-indigo-800 cursor-pointer">
                                                        <i class="fa-solid ${iconClass} text-3xl" onclick="copyIcon('${iconClass}')"></i>
                                                 </div>`
                                $("#systemIcon_divAppend").append(tempHtml);
                            }

                        }

                    });
                }
            }
        }
        rawFile.send(null);
    }
}

function copyIcon(iconClass) {

    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = "fa-solid "+iconClass;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    itzAlert.notice(itzAlert.makeMsgJson("복사", "아이콘이 복사되었습니다.", "확인"),);
    console.log(iconClass);

}

function filter() {

    let search = document.getElementById('systemIcon_inpSearch').value.toLowerCase();
    let iconDiv = document.getElementsByClassName('systemIcon')[0];

    for (let i=0; i<systemIcon_searchIconList.length; i++) {
        if(systemIcon_searchIconList[i].includes(search)) {
            iconDiv.getElementsByClassName(systemIcon_searchIconList[i] + ' text-3xl')[0].parentElement.style.display = "";
        } else {
            iconDiv.getElementsByClassName(systemIcon_searchIconList[i])[0].parentElement.style.display = "none";
        }
    }
}

systemIcon.init();

