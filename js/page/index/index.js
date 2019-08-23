// 当前页
let curPage = 1;
// 每页显示多少条数据
let pageSize = 5;
// 总条数
let total = 0;

let data;
let columnList;
let columnBtn;
let articleTile;
let articleList;
let articleIndex = -1;
$(function () {

    /**
     * 初始化页面
     */
    loadIndex();

    var pageTotal = 0;

    /**
     * 下一页
     */
    $("#id-a-next").click(function () {
        if (total % pageSize == 0) {
            pageTotal = parseInt(total / pageSize);
        } else {
            pageTotal = parseInt((total / pageSize)) + 1;
        }

        if (curPage < pageTotal) {
            ++curPage;
            $("#id-div-articleList").html("");
            loadIndex();
        } else {
            alert("已经是最后一页了");
        }
    });


    /**
     * 上一页
     */
    $("#id-a-prev").click(function () {
        if (curPage <= 1) {
            alert("已经是第一页了");
        } else {
            --curPage;
            $("#id-a-prev").attr("disabled", false);
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
             * 总条数
             */
            total = result.total;
            console.log("total", total);

            /**
             * 首页文章
             */
            articleList = result.articleList;
            console.log(articleList);
            $.each(articleList, function (i, val) {
                $("#id-div-articleList").append("<div class='item mb-5'>" +
                    "<div class='media'>" +
                    "<input type='hidden' value=\'" + i + "\'>" +
                    "<img id='id-img-titleImg' class='mr-3 img-fluid post-thumb d-none d-md-flex' alt='image' style='height:100px; width:250px;border: 1px solid #eee'>" +
                    "<div class='media-body'>" +
                    "<h3 class='title mb-1'><a href='javascript:void(0)' id='id-h3-title'></a></h3>" +
                    "<div class='meta mb-1'><span class='date' id='id-span-time'></span>" +
                    "<span class='time' id='id-span-clickCount'></span>" +
                    "<span class='comment'><a id='id-span-comment'></a></span></div>" +
                    "<div class='intro' id='id-div-artIntroduction'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");

                articleIndex = i;

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

                $("#id-div-artIntroduction").attr("id", "id-div-artIntroduction" + i);
                $("#id-div-artIntroduction" + i).html(articleList[i].artIntroduction);

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
