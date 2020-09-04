// 评论管理、、
$(function() {
    //  向服务器发现ajax请求，获取评论数据
    // 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.comment_list,
        success: function(res) {
            if (res.code == 200) {
                // 使用模板渲染数据
                var htmlStr = template('commentList', res.data)
                $('tbody').html(htmlStr)
            }
        }

    })


})