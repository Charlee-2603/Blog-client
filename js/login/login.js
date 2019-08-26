/**
 * 博客登录js
 */

$(function () {
    $("#id-msg").hide();

    /**
     * 登录(ajax表单请求)
     */
    $("#id-login").on('click', function () {
        let hurl = "http://localhost:8888/sys/user/login";
        $.ajax({
            url: hurl,
            type: "post",
            data: $("#id-form").serialize(),
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
    })
});

// function resizeBannerImage() {
//     var winW = $(window).width();
//     if ($(window).width() > 450) {
//         $("#id-img").attr('display', 'none');
//     }
// }