var common = {
    loadPage(url) {
        $.ajax({
            type: 'GET',
            url:url,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            console.log(data);
            divContent.innerHTML='';
            divContent.innerHTML=data;
        }).fail(function (error) {
        });
    }
}