/**
 * @description 发布文章
 * @author CharLee
 */

// wangEditor编辑器初始化
let E = window.wangEditor;
let editor = new E('#editor');
editor.create();


// 发布文章
$("#id-postArticle").on('click', function () {
    // 富文本编辑器的值
    let value = editor.txt.html();
    // 富文本编辑器的值赋给input隐藏框
    $("#id-artContent").attr('value', value);
});