$(function() {
    // 渲染文件
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(res) {
            var htmlStr = template('categoryList', res)
            $('#selCategory').html(htmlStr)
                // 此时页面中的select标签中是有id的，没有的话要自己加上
        }
    })

    // 2. 新增文章前的图片预览
    // 2.1 给文件标签注册事件
    $('#inputCover').on('change', function() {
        // console.dir(this.files[0])
        var file = this.files[0] // 获取待上传的文件
            // // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
        var url = URL.createObjectURL(file)

        // // 在图片上渲染出来 预览待上传的图片
        $('#form .article_cover').attr('src', url)

        // 上面的内容合写成如下代码
        // $('#form .article_cover').attr('src', URL.createObjectURL(this.files[0]))
    })

    // 日期添加
    jeDate("#testico", {
            zIndex: 99999,
            format: "YYYY-MM-DD",
            isTime: false,
            isToday: true,
            // 是否显示本月或今天
            onClose: false, // 选中日期后自动填充到输入框

        })
        // 给发布或存为草稿按钮注册事件
        // 给form表单注册事件
    $('#form').on('click', '.btn', function(e) {
        // 阻止默认行为
        e.preventDefault()
            // 准备数据
        var data = new FormData($('#form')[0])

        // 将富文本编辑器中的数据添加到里面   富文本编辑器是一个div，因此要单独的来获取一下
        data.append('content', editor.txt.html())
            // 判断是哪个按钮进行的提交
        if ($(e.target).hasClass('btn-release')) { // 修改操作

            data.append('state', '已发布')
        } else { // 存为草稿
            data.append('stare', '草稿')
        }
        // 向服务器发送ajax请求
        $.ajax({

            type: 'post',
            url: BigNew.article_publish,
            data: data,
            contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
            processData: false, // 不要转换成字符串
            success: function(res) {
                if (res.code == 200) {
                    // 让父元素的文章列表项被选中
                    parent.$('.menu .level02>li:eq(0)').click()
                        // 跳转到文章列表页
                    window.history.back()
                }
            }
        })
    })

    // 调用方法实现富文本编辑器的显示
    var E = window.wangEditor
    var editor = new E('#editor')

    editor.create()
})