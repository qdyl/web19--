
{
    // 0、初始化批注内容
    // 原始数据、待添加的数据
    let origin_datas = [
        // {
        //     "id": 'annotation-zv-',
        //     // "target_id": 70248256,
        //     // "target_guid": "99abc979a24d4a7b",
        //     // "user_id": 18674551,
        //     "is_delete": 0,
        //     "created_at": "19-03-21 10:47",
        //     "updated_at": "19-03-21 10:47",
        //     // "comment_guid": "2YAK5b6TRXXnOyQP",
        //     // "target_type": 1,
        //     "content": "测试测试批注内容1",
        //     // "selection_title": "",
        //     // "selection_guid": "comment-0ctAP3Kl2HKf6Mpd",
        //     // "like": 0,
        //     // "isLike": 0,
        //     // "lastLike": null,
        //     // "targetId": 70248256,
        //     // "targetGuid": "99abc979a24d4a7b",
        //     // "userId": 18674551,
        //     // "isDelete": 0,
        //     // "createdAt": "2019-03-21T10:47:44Z",
        //     // "updatedAt": "2019-03-21T10:47:44Z",
        //     // "commentGuid": "2YAK5b6TRXXnOyQP",
        //     // "targetType": 1,
        //     // "selectionTitle": "",
        //     // "selectionGuid": "comment-0ctAP3Kl2HKf6Mpd",
        //     // "User": {
        //     //     "id": 18674551,
        //     //     "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.2.png",
        //     //     "name": "abeet"
        //     // },
        //     // "hasRead": true
        // },
        // {
        //     "id": 'annotation-zv-',
        //     "is_delete": 0,
        //     "created_at": "2019-03-21 10:47",
        //     "updated_at": "2019-03-21 10:47",
        //     "content": "测试测试批注内容2",
        // },
    ];
    let add_datas= {
        "id": 'annotation-zv-',
        "is_delete": 0,
        "created_at": "2019-03-21-10:47:44",
        "updated_at": "2019-03-21-10:47:44",
        "content": "待添加的数据",
    };
    let copy_datas = []

    function init_annotation(){
        $('.all-lists').html('');
        for(let i=0;i<origin_datas.length;i++){
            let html = `<li id="${origin_datas[i].id+i}" class="inner-lists">
                    <div class="inner-lists-box">
                        <!-- 清空评论-->
                       <!-- <div class="empty-sign-items none"><span class="empty-span"><i class="empty-icon"></i>清除评论</span></div>-->
                        <!-- inner列表的评论-->
                        <ul class="sign-items sign-mask">
                            <li class="sign-item">
                                <div class="sign-content-box">
                                    <div class="sign-content-header clearfix">
                                        <div class="user-img pull-left"><img src="annotation-zving/images/user-img.png" alt=""><span class="user-name">YQ</span></div>
                                        <div class="time-or-operate pull-right">
                                            <div class="publish-time ">${origin_datas[i].created_at}</div>
                                            <div class="editor-operate none"><span class="editor">编辑</span> &nbsp;<span class="delete">删除</span></div>
                                        </div>
                                    </div>
                                    <div class="sign-content-body">
                                        <div class="content-show" contenteditable="false">${origin_datas[i].content}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 增加评注-->
                       <!-- <div class="add-to-comment clearfix none">
                            <textarea class="add-textarea" name="1" id="1" cols="20" rows="2" placeholder="添加批注"></textarea>
                            <div class="comfirm-or-cancel">
                                <button class="cancel">取消</button>
                                <button class="comfirm">确认</button>
                            </div>
                        </div>-->
                    </div>
                    <!-- 遮罩层-->
                     <div class="inner-lists-box-mask"></div>
                </li>`;
            $('.all-lists').append(html)
        }
    }
    init_annotation();

    // 1、显示和影藏:'清除评论'
    $(document).click(debounce(function (e) {
        // 1.1、隐藏：'清空批注'
        $(this).find('.empty-sign-items').addClass('none');
        // 1.2、去掉标注位的class
        $(this).find('.inner-lists-box').removeClass('inner-lists-active');
        // 1.3、设置不可编辑
        $('.content-show').attr('contenteditable',false);
        // 1.4、隐藏私有‘添加评论’
        $('.add-to-comment').addClass('none');
        // 1.5、隐藏公用的‘添加评论’
        // $('.com-add-to-comment').addClass('none');
        // 1.6、复原遮罩层显示
        $('.inner-lists-box-mask').show();
        // 1.7、获取批注数据
        storing_data();
        // console.log('origin_datas---',origin_datas)
    },500));

    // 2、点击单个评注的时候，增加类名:inner-lists-active
    $('.all-lists').click(function (e) {
        e.stopPropagation();
        let ele2 = e.target;
        // console.log($(ele2).attr('class'));
        if($(ele2).attr('class') === 'inner-lists-box-mask'){
            $(ele2).hide();
            $(ele2).parent().find('.inner-lists-box').addClass('inner-lists-active');
            $(ele2).parent().find('.empty-sign-items').removeClass('none');
            $(ele2).parent().find('.add-to-comment').removeClass('none');
            $(ele2).parent().find('.add-textarea').focus();
        }
        // 2.1、二次编辑批注内容
        if($(ele2).attr('class') === 'editor'){
            // 设置可以编辑状态
            let $foucus_el = $(ele2).closest('.sign-content-box').find('.content-show');
            $foucus_el.attr('contenteditable',true);
            _set_focus($foucus_el[0]);
        };
        // 删除评论，并初始化,，以及删除左边编辑区选中的文本
        if($(ele2).attr('class') === 'delete'){
            let _index_id = $(ele2).closest('.inner-lists').attr('id');
            //console.log('_index_id---',_index_id)
            let _index = parseInt(_index_id.charAt(_index_id.length-1));
            origin_datas.splice(_index,1);
            init_annotation();
            // 响应左边编辑区
            $('#ueditor_0').contents().find(`#${_index_id}`).removeClass('hover-hightbg').attr('id','').css('background-color','transparent');
        }
        // 2.2、追加评论---确认
        if($(ele2).attr('class') === 'comfirm'){
            /*  let add_text = $('.add-textarea').val();
              let add_time =*/
            // $(eledom).parent().parent().parent().find('.sign-items')
        }
        // 2.3、追加评论--取消
        if(ele2.getAttribute('class') === 'cancel'){
            return;
        }
    });

    // 3、放在单个评注上显示背景色,以及显示'删除、编辑',隐藏'时间'---事件委托
    // 3、简写
    $('.all-lists').on(' mouseleave mouseenter','.sign-item',function(e){
        e.stopPropagation();
        $(this).toggleClass('sign-item-hover')
    });

    // 4、函数：将光标定位到最后
    function _set_focus(el) {
        el.focus();
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // 5、公用添加评论，当输入框的内容不为空的时候，显示'取消'、'确认'--- 采用函数防抖
    $('.com-add-textarea').on('input',debounce(function (e) {
        if($('.com-add-textarea').val() !== ''){
            $('.com-comfirm-or-cancel').show()
        }else{
            $('.com-comfirm-or-cancel').hide()
        }
    },300));

    // 6、公用添加评论-取消|确认
    $('.com-add-to-comment').click(function (e) {
        let ele = e.target;
        if($(ele).attr('class')===  'com-cancel'){
            // 2.1、修改文字背景颜色
            UE.getEditor('container').execCommand( 'undo' ); // 撤销上一次操作(不设置背景颜色)
            $('.com-add-to-comment').addClass('none');
            flag1 = false
        }
        if($(ele).attr('class')===  'com-comfirm'){
            flag1 = true;
            // 5.1、更新批注数组（内容、时间、id）
            let value1 = $('.com-add-textarea').val();
            let add_date = new Date().toLocaleString('chinese',{hour12:false});
            let created_at_time = add_date.replace(/\//g,'-').match(/^\d{4}-\d{1,2}-\d{1,2}\s+\d{2}:\d{2}/g);
            origin_datas.push({
                'id':`annotation-zv-`,
                'is_delete':0,
                'created_at': created_at_time[0],
                'content':value1,
            });
            //$('.all-lists').html('');
            init_annotation();
            // 5.2、置空输入框，并隐藏它
            $('.com-add-textarea').val('');
            $('.com-add-to-comment').addClass('none');
            //设置选中文本的样式、以及属性
            _setting_choosed_span();
        }
        //flag1 = false;// 要注释掉
    });

    // 7、函数：设置选中文本的样式、以及属性
    function _setting_choosed_span(){
        if(flag1){
            // 2.4、遍历node1节点，给span节点添加class、以及id
            let annotation_id = $('.inner-lists:last-child').attr('id');
            let index = parseInt(annotation_id.charAt(annotation_id.length-1));
            let newId = 'annotation-zv-'+index;
            // 代码...

            let range = UE.getEditor('container').selection.getRange();
            console.log('range----------1',range)
            console.log('cloneRange()----------2',range.cloneRange())
            console.log('range.cloneContents()------3',range.cloneContents());
            console.log('range.startContainer------4',range.startContainer);
            console.log('range.endContainer------4',range.endContainer);
            // range.traversal( function ( node ) {
            //     // let node_bg = node.style.backgroundColor;
            //     if ( node.nodeName === 'SPAN'  ) {
            //         // node.setAttribute('id',newId);
            //         node.className = `hover-hightbg + ${newId}`;
            //     }
            // });


            // 2.3、设置选中文本高亮：（鼠标放上去高亮）
            let node1= UE.getEditor('container').selection.getStartElementPath();
            console.log('node1---------666666',node1)
            for(let n=0;n<node1.length;n++){
                // console.log('node1[n].tagName---',node1[n].tagName);
                if(node1[n].tagName ==='SPAN' && node1[n].style.backgroundColor !== '' ){
                    // alert(1111)
                    node1[n].setAttribute('class','hover-hightbg');
                    node1[n].setAttribute('id',newId);
                }
            }
            //console.log(' node1[0].tagName.tolowercase()', node1[0].tagName);
        }
    }

    // 8、数遍放置在右边的批注内容上，左边的内容高亮
    $('.all-lists').on('mouseenter mouseleave','.inner-lists-box-mask',function(){
        let id_index = $(this).parent().attr('id');
        // console.log('id_index----',id_index);
        $('#ueditor_0').contents().find(`#${id_index}`).toggleClass('hover-bg');
    });

    // 9、存储评论的内容：（内容、是否删除、）
    function storing_data(){
        $('.inner-lists').each(function (index,ele) {
             // origin_datas[index].id = $(ele).attr('id')
        });
        $('.content-show').each(function (index,ele) {
            origin_datas[index].content = $(ele).html()
        })
    }

    // 10、防抖函数
    function debounce(fn,wait){
        let timeout = null;
        return function(){
            if(timeout !== null) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(fn,wait);
        }
    }
    //storing_data();
}

// 测试
$('.right-aside').click(function (e) {
    //console.log(111111+'测试');
    // 测试
    // 测试
    // $('.hover-hightbg').css('font-size','50px');
    //$('.hover-hightbg').css('color','blue')
    // document.getNodeById('annotation-zv-2').setAttribute('style','font-size:50px!important')
   /* let node1= UE.getEditor('container').selection.getStartElementPath();
    node1[0].setAttribute('style','font-size:50px!important')*/
})


