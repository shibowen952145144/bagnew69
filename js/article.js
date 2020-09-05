$(function() {
    // 1.一跳转到这个文章详情页面 就要先获取URL中的id
    // var str = location.search.slice(1)
    // var id = utils.convertToObj(str).id
    var id = utils.convertToObj(location.search.slice(1)).id
        // 2. 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function(res) {
            // 3. 将获取到的文章详情数据渲染到页面中
            // console.log(res)
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data)
                $('.setfr .box').html(htmlStr)
                    // 给评论表单的隐藏域添加上当前文章的id
                $('#myForm input[name=articleId]').val(res.data.id)
                getCommentData(res.data.id)
            }
        }
    })

    // 2. 发表评论
    // 2.1 给form注册事件
    $('#myForm').on('submit', function(e) {
        // 2.2 阻止默认行为
        e.preventDefault()
            // 2.3 发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $(this).serialize(),
            success: function(res) {
                // 2.4 评论成功后要清空输入框
                if (res.code == 201) {
                    alert('发表评论成功...')
                    $('#myForm')[0].reset()
                }
            }
        })
    })

    // 3. 实现文章详情页面中的评论列表
    function getCommentData(id) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: id
            },
            success: function(res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('commentListTmp', res)
                    $('.comment_list_con').html(htmlStr)

                    // 多少条评论
                    $('.comment_count').html(`${res.data.length}条评论`)


                }
            }
        })
    }
    // 1.2 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function(res) {
            // console.log(res);
            // 1.3 将数据渲染到页面
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data)
                $('.setfr .box').html(htmlStr)

                // 要将当前文章的id存到form表单中的隐藏域中
                $('#myForm input[name="articleId"]').val(res.data.id)

                // 文章数据渲染完毕之后，要显示评论列表的数据
                getCommentData(res.data.id)
            }
        }
    })



})