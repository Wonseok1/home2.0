const REST_COMMON_SIGNUP = '/api/common/signup';
var signup = {
    init() {
        var _this = this;
        btnSave.onclick = function () {
            _this.save();
        };

        userId.addEventListener('keyup', function () {
            _this.checkExist(userId.value);
        });
    },
    checkExist(userId) {
        $.ajax({
            type: 'GET',
            url: REST_COMMON_SIGNUP+'/check' ,
            data: {
                userId: userId
            },
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            console.log(data);
            if (data) {
                $("#id-exist").removeClass("hidden");
            }else{
                $("#id-exist").addClass("hidden");
            }
        }).fail(function (error) {
        });
    },
    save() {
        var userInfo = {
            userId                          : userId.value       ,
            userPw                          : userPw.value       ,
            userPwCheck                     : userPw.value       ,
            userAuthId                      : "TEMP"       ,
            useYn                           : true       ,
            userOrgId                       : 'TEMP'       ,
            accountNonExpiredYn             : true       ,
            accountNonLockedYn              : true       ,
            credentialNonExpiredYn          : true       ,
            ctiYn                           : false       ,
            userExtPhone                    : "1111"       ,
            userEmail                       :''      ,
            userPhone                       :''      ,
            workStart                       :''      ,
            workEnd                         :''      ,
        }
        $.ajax({
            type: 'POST',
            url: REST_COMMON_SIGNUP ,
            data: JSON.stringify(userInfo),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            window.location.href = "/";
        }).fail(function (error) {
        });
    },
}

signup.init();