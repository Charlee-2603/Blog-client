// 当前页
let curPage = 1;
// 每页显示多少条数据
let pageSize = 5;
let data;
let columnList;
let columnBtn;
let articleTile;

$(function () {


    loadIndex();

    /**
     * 下一页
     */
    $("#id-a-next").click(function () {
        ++curPage;
        alert(curPage);
        $("#id-div-articleList").html("");
        loadIndex();
    });

    /**
     * 上一页
     */
    $("#id-a-prev").click(function () {
        if (curPage <= 1) {
            alert("已是第一页");
        } else {
            --curPage;
            $("#id-a-prev").attr("disabled", false);
            alert(curPage);
            $("#id-div-articleList").html("");
            loadIndex();
        }
    });

});

/**
 * 初始化
 */
function loadIndex() {
    var hurl = "http://localhost:8888/sys/front/index";
    $.ajax({
        type: "POST",
        url: hurl,
        data: {
            curPage: curPage,
            pageSize: pageSize
        },
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

            /**
             * 首页导航栏
             */
            $("#id-a-nav-one").text(columnList[0].sysName);
            $("#id-a-index").attr("href", columnList[0].sysValue);
            // $("#id-a-nav-two").text(columnList[1].sysName);
            // $("#id-a-blogList").attr("href", columnList[1].sysValue);
            $("#id-a-nav-three").text(columnList[1].sysName);
            $("#id-a-about").attr("href", columnList[1].sysValue);

            /**
             * 首页导航栏按钮
             */
            columnBtn = result.columnBtn;
            $("#id-a-columnBtn").text(columnBtn[0].sysName);

            /**
             * 首页文章
             */
            var articleList = result.articleList;
            console.log(articleList);
            $.each(articleList, function (i, val) {
                $("#id-div-articleList").append("<div class='item mb-5'>" +
                    "<div class='media'>" +
                    "<img id='id-img-titleImg' class='mr-3 img-fluid post-thumb d-none d-md-flex' alt='image'>" +
                    "<div class='media-body'>" +
                    "<h3 class='title mb-1'><a href='javascript:void(0)' id='id-h3-title'></a></h3>" +
                    "<div class='meta mb-1'><span class='date' id='id-span-time'></span>" +
                    "<span class='time' id='id-span-clickCount'></span>" +
                    "<span class='comment'><a id='id-span-comment'></a></span></div>" +
                    "<div class='intro' id='id-div-artContent'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
                $("#id-article").attr("id", "id-article" + i);
                $("#id-article" + i).attr("value", articleList[i].artId);

                $("#id-img-titleImg").attr("id", "id-img-titleImg" + i);
                $("#id-img-titleImg" + i).attr("src", articleList[i].artTitleImgURL);

                $("#id-h3-title").attr("id", "id-h3-title" + i);
                $("#id-h3-title" + i).click(function () {
                    window.location.href = "blog-post.html?artId=" + articleList[i].artId;
                });

                $("#id-h3-title" + i).text(articleList[i].artTitle);
                $("#id-span-time").attr("id", "id-span-time" + i);
                $("#id-span-time" + i).html(subCreateTime(articleList[i].artCreateTime));
                $("#id-span-clickCount").attr("id", "id-span-clickCount" + i);
                $("#id-span-clickCount" + i).html("浏览次数：" + articleList[i].artClickCount);
                $("#id-span-comment").attr("id", "id-span-comment" + i);
                $("#id-span-comment" + i).html(articleList[i].artComment + "人评论");
                $("#id-div-artContent").attr("id", "id-div-artContent" + i);
                $("#id-div-artContent" + i).html(subContent(articleList[i].artContent));
                $("#id-artTitle").html(articleTile);
            });
        }
    });
}

/**
 * 截取时间到分（省略秒）
 * @param artCreateTime
 * @returns {string}
 */
function subCreateTime(artCreateTime) {
    return artCreateTime.substring(0, 16);
}

/**
 * 截取文章前95个字（省略秒）
 * @param artCreateTime
 * @returns {string}
 */
function subContent(artContent) {
    var str = artContent.substring(0, 120);
    return str + "...";
}

/**
 * 文章搜索
 */
function searchArticle() {
    alert(1);
    var value = $("#semail").val();
    var hurl = "http://localhost:8888/sys/article/getArticleByCondition";
    $.post(
        hurl,
        {"condition": value},
        function (e) {
            console.log(eval("(" + e + ")"));
        }
    );
}
