$(function() {

    //  文章列表分类数据的获取
    $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function(res) {
                if (res.code == 200) {
                    var htmlStr = template('categoryList', res)

                    $('#selCategory').html(htmlStr)
                }
            }
        })
        // 渲染数据 获取文章列表页中的第一页的数据
    $.ajax({

            type: 'get',

            url: BigNew.article_query,

            success: function(res) {

                var htmlStr = template('articleList', res.data)
                $('tbody').html(htmlStr)

            }

        })
        // 3.1 封装一个实现分页的函数 是在获取文章列表页数据完成后来调用的
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            // totalPages: 35,
            totalPages: res.data.totalPage,
            visiblePages: 7, // 每个显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function(event, page) {
                $('#page-content').text('Page ' + page)
            }
        })
    }






})