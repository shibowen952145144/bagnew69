$(function() {
    //1. 一跳转过来，就立马发送请求，获取数据
    // 文章编辑
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(res) {
            // console.log(res)
            // console.log(typeof res)
            // 1.2 获取数据并渲染页面
            if (res.code == 200) {
                var htmlStr = template('categoryList', res)
                $('#selCategory').html(htmlStr)
            }
        }
    })
    var str = location.search.slice(1)
    var id = utils.converToObj(str).id
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function(res) {
            if (res.code == 200) {
                $('#form input[name=title]').val(res.data.title)
                $('#form .article_cover').attr('src', res.data.cover)
                $('#form select[name="categoryId"]').val(res.data.categoryId)
                $('#form input[name=date]').val(res.data.date)
                $('#form textarea[name=content]').val(res.data.content)

                editor.txt.html(res.data.content) // 富文本编辑器中内容的渲染
            }
        }
    })
    jeDate("#testico", {
        format: "yyyy-mm-dd",
        isTime: false,
        isToday: true, //是否显示本月或今天
        minDate: "2014-08-19 00:00:00"
    })
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.create()

    // 实现图片预览
    $('#inputCover').on('change', function() {
            var file = this.files[0]
                // 获取待上传的文件
                // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
            var url = URL.createObjectURL(file)
                // 在图片上渲染出来  预览待上传的图片
            $('#form .article_cover').attr('src', url)
        })
        // 更新数据
        // 给form表单注册事件
    $('#form').on('click', '.btn', function(e) {
        // 阻止默认的提交行为
        e.preventDefault()
            // 准备数据
        var myForm = $('#form')[0]
        var data = new FormData(myForm)

        data.append('content', editor.txt.html())
            // 判断是哪个按钮进行的提交  console.log(e.target)
        if ($(e.target).hasClass('btn-edit')) { //修改操作
            data.append('state', '已发布')
        } else { //存为草稿
            data.append('state', '草稿')
        }
        //    向服务器发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: data,
            contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
            processData: false, // 不要转换成字符串
            success: function(res) {
                if (res.code == 200) {
                    window.history.back()
                }
            }
        })
    })



})