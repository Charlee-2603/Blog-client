$(function () {
    var pageIndex = 1;
    var pageNum = 6;
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

            /**
             * 首页导航栏
             */
            $("#id-a-nav-one").text(columnList[0].sysName);
            $("#id-a-index").attr("href", columnList[0].sysValue);
            $("#id-a-nav-two").text(columnList[1].sysName);
            $("#id-a-blogList").attr("href", columnList[1].sysValue);
            $("#id-a-nav-three").text(columnList[2].sysName);
            $("#id-a-about").attr("href", columnList[2].sysValue);

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
                    "<input type='hidden' id='id-article'>" +
                    "<img id='id-img-titleImg' class='mr-3 img-fluid post-thumb d-none d-md-flex' alt='image'>" +
                    "<div class='media-body'>" +
                    "<h3 class='title mb-1'><a href='blog-post.html' id='id-h3-title'></a></h3>" +
                    "<div class='meta mb-1'><span class='date' id='id-span-time'></span><span class='time' id='id-span-clickCount'>" +
                    "</span><span class='comment'><a id='id-span-comment'></a></span></div>" +
                    "<div class='intro' id='id-div-artContent'></div>" +
                    "<a class='more-link' href='blog-post.html'>阅读更多 &rarr;</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
                $("#id-article").attr("id", "id-article" + i);
                $("#id-article" + i).attr("value", articleList[i].artId);
                $("#id-img-titleImg").attr("id", "id-img-titleImg" + i);
                $("#id-img-titleImg" + i).attr("src", articleList[i].artTitleImgURL);
                $("#id-h3-title").attr("id", "id-h3-title" + i);
                $("#id-h3-title" + i).text(articleList[i].artTitle);
                $("#id-span-time").attr("id", "id-span-time" + i);
                $("#id-span-time" + i).html(subCreateTime(articleList[i].artCreateTime));
                $("#id-span-clickCount").attr("id", "id-span-clickCount" + i);
                $("#id-span-clickCount" + i).html(articleList[i].artClickCount + "人浏览");
                $("#id-span-comment").attr("id", "id-span-comment" + i);
                $("#id-span-comment" + i).html(articleList[i].artComment + "人评论");
                $("#id-div-artContent").attr("id", "id-div-artContent" + i);
                $("#id-div-artContent" + i).html(subContent(articleList[i].artContent));
            });
        }
    });


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
        var str = artContent.substring(0, 95);
        return str + "...";
    }
});

