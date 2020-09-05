$(function() {
    // 1. 文章分类的展示
    $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function(res) {
                console.log(res);
                if (res.code == 200) {
                    // 生成带数据的html标签
                    var htmlStr = template('categoryList', res)

                    // 先渲染竖着的分类 
                    $('.menu .level_two').html('<li class="up"></li>' + htmlStr)

                    // 渲染横着的导航
                    $('.menu .left_menu').html(htmlStr)
                }
            }
        })
        // 2. 热点图渲染
    $.ajax({
            type: 'get',
            url: BigNew.hotPic_news,
            success: function(res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('hotPicTmp', res)
                    $('.focus_list').html(htmlStr)
                }
            }
        })
        // 3. 最新资讯
    $.ajax({
            type: 'get',
            url: BigNew.latest_news,
            success: function(res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('latestNewsList', res)
                    $('.common_news').html(htmlStr)
                }
            }
        })
        // 4. 一周热门排行 
    $.ajax({
            type: 'get',
            url: BigNew.hotrank_list,
            success: function(res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('hotrank_list', res)
                    $('.hotrank_list').html(htmlStr)
                }
            }
        })
        // 5. 最新评论
    $.ajax({
            type: 'get',
            url: BigNew.latest_comment,
            success: function(res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('latestCommentList', res)
                    $('.comment_list').html(htmlStr)
                }
            }
        })
        // 6. 焦点关注
    $.ajax({
            type: 'get',
            url: BigNew.attention_news,
            success: function(res) {
                // console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('attentionList', res)
                    $('.guanzhu_list').html(htmlStr)
                }
            }
        })
        // 7. 文章搜索功能
        // 7.1 给按钮注册事件
    $('.search_btn').on('click', function() {
        // 7.2 获取输入的内容
        var txtValue = $('.search_txt').val()
            // 7.3 判断输入内容是否为空
        if (!txtValue.trim()) {
            alert('输入的内容不能为空，请重新输入')
            return
        }
        // 7.4 跳转到列表页并将关键词传过去
        window.location.href = './list.html?search=' + txtValue
    })

})