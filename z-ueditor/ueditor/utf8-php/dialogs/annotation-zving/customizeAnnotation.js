UE.registerUI('annotation',function(editor,uiName){
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            alert('execCommand---------:' + uiName)
        }
    });

    //创建一个批注button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:'annotation',
        //提示
        title:uiName,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-image:url("../../dialogs/annotation-zving/images/add-btn002.png")!important;background-size:20px 20px!important;background-position:center;',
        //点击时执行的命令
        onclick:function (e) {
            //这里可以不用执行命令,做你自己的操作也可,就是执行第4行的代码

           // e.stopPropagation();
            editor.execCommand(uiName);
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiName);
        //alert('---扩展批注---');
        if (state === -1) {
            // -1 当前命令不可用
            // 0 当前命令可用
            // 1 当前命令已经执行过
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
            $('.tx-add-btn').removeClass('none')
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
