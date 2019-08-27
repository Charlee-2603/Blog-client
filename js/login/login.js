/**
 * 博客登录js
 */

let codeImgUrl = "http://localhost:8888/kaptcha";
let url = "http://localhost:8888/sys/user/login";

$(function () {

    // 提示框隐藏
    $("#id-msg").hide();

    // 获取验证码图片
    getCodeImg();

    /**
     * 登录(ajax表单请求)
     */
    $("#id-login").click(function () {
        $.ajax({
            url: url,
            type: "post",
            data: $("#id-form").serialize(),
            withCredentials: true,
            success: function (e) {
                let data = JSON.parse(e);
                if (data.type == "success") {
                    window.location.href = "index.html";
                } else {
                    let msg = "* " + data.msg;
                    $("#id-msg").text(msg);
                    $("#id-msg").show();
                }
            },
        });
    });

});



/**
 * 获取验证码图片
 */
function getCodeImg() {
    $.ajax({
        url: codeImgUrl,
        type: 'post',
        success: function (e) {
            let data = JSON.parse(e);
            $("#captcha_img").attr("src", "data:image/jpg;base64," + data.codeImg);
            $("#session_id").attr("value", data.sessionId);
        },
    })
}


/**
 * 验证码刷新
 */
function refresh() {
    // 提示框隐藏
    $("#id-msg").hide();
    getCodeImg();
}