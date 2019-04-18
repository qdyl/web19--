// 1、显示和影藏:'清除评论'
$(document).click(function (e) {
    // 1.1、隐藏：'清空批注'
    $(this).find('.empty-sign-items').addClass('none');
    // 1.2、去掉标注位的class
    $(this).find('.inner-lists-box').removeClass('inner-lists-active');
    // 1.3、设置不可编辑
    $('.content-show').attr('contenteditable',false);

});
// 2、点击单个评注的时候，增加类名:inner-lists-active
$('.inner-lists-box').click(function (e) {
    e.stopPropagation();
    $(this).addClass('inner-lists-active');
    $(this).find('.empty-sign-items').removeClass('none');
    $(this).find('.add-to-comment').removeClass('none');
    // 2.1、二次编辑批注内容
    let eledom = e.target;
    if(eledom.getAttribute('class') === 'editor'){
        let $foucus_el = $(eledom).parent().parent().parent().parent().find('.content-show');
        $foucus_el.attr('contenteditable',true);
        set_focus($foucus_el[0]);
    };
    // 2.2、添加评论---确认
    if(eledom.getAttribute('class') === 'comfirm'){
        /*  let add_text = $('.add-textarea').val();
          let add_time =*/
        // $(eledom).parent().parent().parent().find('.sign-items')

    }
    // 2.3、添加评论--取消
    if(eledom.getAttribute('class') === 'cancel'){
        /*return;*/
    }
});

// 2、放在单个评注上显示背景色,以及显示'删除、编辑',隐藏'时间'
$('.sign-item').hover(function(){
    $(this).addClass('sign-item-hover');
},function(){
    $(this).removeClass('sign-item-hover');
});

// 3、函数：将光标定位到最后
function set_focus(el) {
    el.focus();
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// 4、选择文本的时候，显示添加图标
