const file ={
    init() {

    },
    test() {
        $.ajax({
            type: 'GET',
            url: "/file",
            contentType: 'application/json; charset=utf-8',
            async : false
        }).done(function (data) {
        }).fail(function (error) {
        });
    }
}

file.init();