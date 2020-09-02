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
        // 2.1 发送ajax请求
    $.ajax({
            type: 'get',
            url: BigNew.article_query,
            success: function(res) {
                // 2.2 将获取到的数据渲染到页面中  绑定模板和数据
                var htmlStr = template('articleList', res.data)
                $('tbody').html(htmlStr)
            }
        })
        // 渲染数据 获取文章列表页中的第一页的数据
        // 3.1 封装一个实现分页的函数 是在获取文章列表页数据完成后来调用的
    function pagination(res) {
        $('#pagination-demo').twbsPagination({

            totalPages: res.data.totalPage,
            visiblePages: 7, // 每个显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function(event, page) {

                $.ajax({
                    type: 'get',
                    url: BigNew.article_query,
                    data: {
                        key: $('#myForm input[name=key]').val(), // 关键词
                        type: $('#myForm select[name=type]').val(), // 分类
                        state: $('#myForm input[name=state]').val(), // 文章状态
                        page: page, // 当前页码
                        perpage: 6 // 默认显示的条数
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            // 渲染数据
                            var htmlStr = template('articleList', res.data)
                            $('tbody').html(htmlStr)
                        }
                    }
                })
            }
        })
    }
    // 4.1 给form表单注册事件submit事件
    $('#myForm').on('submit', function(e) {
            // 4.2 阻止默认请求行为
            e.preventDefault()
                // 4.3 发送ajax请求 注意条件
            $.ajax({
                type: 'get',
                url: BigNew.article_query,
                data: {
                    key: $('#myForm input[name=key]').val(), // 关键词
                    type: $('#myForm select[name=type]').val(), // 分类
                    state: $('#myForm input[name=state]').val(), // 文章状态
                    page: 1, // 当前页码
                    perpage: 6 // 默认显示的条数
                },
                success: function(res) {
                    if (res.code == 200) {
                        // 4.4 将筛选出来的数据渲染到页面上
                        var htmlStr = template('articleList', res.data)
                        $('tbody').html(htmlStr)
                            // 判断是否筛选出来的数据
                        if (res.data.totalCount == 0) {
                            //  说明没有符合条件的数据  应该要显示无数据 隐藏分页插件
                            $('#pagination-demo').hide().next().show()
                        } else {
                            // 开启分页插件
                            $('#pagination-demo').show().next().hide()
                                // 改变页码显示
                                // 第1个参数是当总页码改变的时候
                                // 第2个参数是现在的总页码值
                                // 第3个参数是默认显示的页码值
                                // $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)

                            // 启用分页
                            pagination(res)
                        }
                    }
                }
            })
        })
        // 删除功能


})