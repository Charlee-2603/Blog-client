$(function () {

    let data;
    let columnList;
    let columnBtn;
    let articleList;
    var hurl = "http://localhost:8888/sys/front/index";

    $.ajax({
        url: hurl,
        success: function (e) {
            var result = eval("(" + e + ")");
            console.log("e:", result);
            data = result.baseInfo[0];

            // 博客名
            $("#id-a-title").html(data.sysName + "'Blog");
            // 头像
            $("#id-img-avatar").attr("src", data.sysValue);
            // 描述
            $("#id-div-desc").html(data.sysDesc);

            columnList = result.columnList;
            $("#id-a-nav-one").text(columnList[0].sysName);
            $("#id-a-nav-two").text(columnList[1].sysName);
            $("#id-a-nav-three").text(columnList[2].sysName);

            columnBtn = result.columnBtn;
            $("#id-a-columnBtn").text(columnBtn[0].sysName);

            var articleList = result.articleList;
            console.log(articleList);

            $("#id-img-titleImgOne").attr("src", articleList[0].artTitleImg);
            $("#id-img-titleImgTwo").attr("src", articleList[1].artTitleImg);
            $("#id-img-titleImgThree").attr("src", articleList[2].artTitleImg);
            $("#id-img-titleImgFour").attr("src", articleList[3].artTitleImg);
            $("#id-img-titleImgFive").attr("src", articleList[4].artTitleImg);
            $("#id-img-titleImgSix").attr("src", articleList[5].artTitleImg);
            $("#id-h3-titleOne").text(articleList[0].artTitle);
            $("#id-h3-titleTwo").text(articleList[1].artTitle);
            $("#id-h3-titleThree").text(articleList[2].artTitle);
            $("#id-h3-titleFour").text(articleList[3].artTitle);
            $("#id-h3-titleFive").text(articleList[4].artTitle);
            $("#id-h3-titleSix").text(articleList[5].artTitle);

        },

    });
});

$("#condition").click(function () {
    var value = $("#semail").val();
    console.log('value', value);
    var hurl = "http://localhost:8888/sys/article/getArticleByCondition";
    $.ajax({
        url: hurl,
        data: {
            condition: value
        },
        success: function (e) {
            var result = eval("(" + e + ")");
            console.log(result);
            alert(result);
        }
    });
});