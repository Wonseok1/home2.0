const mainTabs = document.querySelector(".main-tabs");
const mainSliderCircle = document.querySelector(".main-slider-circle");
const roundButtons = document.querySelectorAll(".round-button");

const colors = {
    blue: {
        50: {
            value: "#e3f2fd"
        },
        100: {
            value: "#bbdefb"
        }
    },
    green: {
        50: {
            value: "#e8f5e9"
        },
        100: {
            value: "#c8e6c9"
        }
    },
    purple: {
        50: {
            value: "#f3e5f5"
        },
        100: {
            value: "#e1bee7"
        }
    },
    orange: {
        50: {
            value: "#ffe0b2"
        },
        100: {
            value: "#ffe0b2"
        }
    },
    red: {
        50: {
            value: "#ffebee"
        },
        100: {
            value: "#ffcdd2"
        }
    }
};

const getColor = (color, variant) => {
    return colors[color][variant].value;
};

const handleActiveTab = (tabs, event, className) => {
    tabs.forEach((tab) => {
        tab.classList.remove(className);
    });

    if (!event.target.classList.contains(className)) {
        event.target.classList.add(className);
    }
};

mainTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetColor = event.target.dataset.color;
    const targetTranslateValue = event.target.dataset.translateValue;

    if (event.target.classList.contains("round-button")) {
        mainSliderCircle.classList.remove("animate-jello");
        void mainSliderCircle.offsetWidth;
        mainSliderCircle.classList.add("animate-jello");

        root.style.setProperty("--translate-main-slider", targetTranslateValue);
        root.style.setProperty("--main-slider-color", getColor(targetColor, 50));
        root.style.setProperty("--background-color", getColor(targetColor, 100));

        handleActiveTab(roundButtons, event, "active");

        if (!event.target.classList.contains("gallery")) {
            root.style.setProperty("--filters-container-height", "0");
            root.style.setProperty("--filters-wrapper-opacity", "0");
        } else {
            root.style.setProperty("--filters-container-height", "3.8rem");
            root.style.setProperty("--filters-wrapper-opacity", "1");
        }
    }
});
//
// const filterTabs = document.querySelector(".filter-tabs");
// const filterButtons = document.querySelectorAll(".filter-button");
//
// filterTabs.addEventListener("click", (event) => {
//     const root = document.documentElement;
//     const targetTranslateValue = event.target.dataset.translateValue;
//
//     if (event.target.classList.contains("filter-button")) {
//         root.style.setProperty("--translate-filters-slider", targetTranslateValue);
//         handleActiveTab(filterButtons, event, "filter-active");
//     }
// });


$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )- 2);
            break;
        case 38:
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )- 2);
            break;
        case 39:
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )+ 2);
            break;
        case 40:
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )+ 2);
            break;
    }

});
bookDetail = {
    init() {
        bookDetail.loadBook();
        bookDetail.elementEvent();
    },
    elementEvent() {
        bookDetail_leftPage.onclick = function () {
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )- 2)
        };
        bookDetail_btnLeft.onclick = function () {
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )- 2)
        };
        bookDetail_rightPage.onclick = function () {
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )+ 2)
        };
        bookDetail_btnRight.onclick = function () {
            bookDetail.changePage(parseInt(bookDetail_bookPage.value )+ 2)
        };
        bookDetail_bookPage.addEventListener('keyup', function () {
            bookDetail.changePage(bookDetail_bookPage.value);
        });
        bookDetail_btnOut.onclick = function () {
            window.location.href = "/system/main/main"
        };
    },
    loadBook() {
        $.ajax({
            type: 'GET',
            url: REST_BOOK_URL+"/"+$("#bookDetail_bookId").val(),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            console.log(data);
            console.log("data");
            if (data.length) {
                var leftPage = data.pageNum;
                bookDetail.changePage(leftPage);
            }else{
                bookDetail.changePage(1);
            }
        }).fail(function (error) {

        });
    },
    changePage(page) {
        if (page < 1) {
            itzAlert.alert(itzAlert.makeMsgJson("알림", "최초 페이지 입니다.", "확인"))
            $("#bookDetail_bookPage").val(1);
        }else if((parseInt(page)+1) > parseInt( bookDetail_lastPage.value)){
            let lastPage = parseInt(bookDetail_lastPage.value )- 1;
            $("#bookDetail_bookPage").val(lastPage);
            $("#bookDetail_leftPage").attr("src", REST_BOOK_URL+"/"+ $("#bookDetail_bookId").val() +'/'+ lastPage  );
            $("#bookDetail_rightPage").attr("src", REST_BOOK_URL+"/"+ $("#bookDetail_bookId").val() +'/'+bookDetail_lastPage.value );
            itzAlert.alert(itzAlert.makeMsgJson("알림", "마지막 페이지 입니다.", "확인"))
        }else{
            let rightPage = parseInt(page)+ parseInt(1)
            $("#bookDetail_leftPage").attr("src", REST_BOOK_URL+"/"+ $("#bookDetail_bookId").val() +'/'+ page  );
            $("#bookDetail_rightPage").attr("src", REST_BOOK_URL+"/"+ $("#bookDetail_bookId").val() +'/'+rightPage );
            $("#bookDetail_bookPage").val(page);
        }

    }
}

bookDetail.init();