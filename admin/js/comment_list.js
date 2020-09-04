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
                    //1.3 判断一下是不是有数据，如果没有数据则不要显示分页插件
                if (res.data.data.totalCount == 0) {
                    $('#pagination-demo').hide().next().show()
                } else {
                    $('#pagination-demo').show().next().hide()
                    pagination(res)
                }
            }
        }

    })
    var currentPage = 1

    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function(event, page) {
                //  console.log(event,page);
                // page是当前页码
                currentPage = page
                $.ajax({
                    type: 'get',
                    url: BigNew.comment_list,
                    data: {
                        page: page
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            var htmlStr = template('commentList', res.data)
                            $('tbody').html(htmlStr)
                        }
                    }
                })
            }
        })
    }
    // 通过 评论   给删除按钮注册事件
    // $('tbody').on('click', 'btn-pass', function() {
    //         //  发送ajax请求
    //         var _this = this
    //         $.ajax({
    //             type: 'post',
    //             url: BigNew.comment_pass,
    //             data: {
    //                 id: $(this).data('id')
    //             },
    //             success: function(res) {
    //                 console.log(res)
    //                     // 3.3 更新当前这条数据
    //                 if (res.code == 200) {
    //                     $(_this).parent().prev().text(res.msg)
    //                 }
    //             }
    //         })
    //     })
    $('tbody').on('click', '.btn-pass', function() {
            // 3.2. 发送ajax请求
            var _this = this
            $.ajax({
                type: 'post',
                url: BigNew.comment_pass,
                data: {
                    id: $(this).data('id')
                },
                success: function(res) {
                    // console.log(res);
                    // 3.3 更新当前这条数据
                    if (res.code == 200) {
                        $(_this).parent().prev().text(res.msg)
                    }
                }
            })
        })
        // 拒绝评论按钮   给按钮注册事件
    $('tbody').on('click', '.btn-reject', function() {
        var _this = this
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: $(this).data('id')
            },
            success: function(res) {
                // 更新当前这条数据
                if (res.code == 200) {
                    $(_this).parent().prev().text(res.msg)
                }
            }
        })
    })

    // 删除评论    给通过按钮注册事件
    $('tbody').on('click', '.btn-del', function() {
        //  发送AJAX请求
        var _this = this
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id')
            },
            success: function(res) {
                // 更新当前页面
                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.comment_list,
                        data: {
                            page: currentPage
                        },
                        success: function(res) {
                            if (res.code == 200) {
                                var htmlStr = template('commentList', res.data)
                                $('tbody').html(htmlStr)

                                // 如果删完了数据了 则不要显示分页控件了
                                if (res.data.totalCount == 0) {
                                    $('#pagination-demo').hide().next().show()
                                } else {
                                    $('#pagination-demo').show().next().hide()

                                    if (res.data.data.length == 0) {
                                        currentPage -= 1
                                    }
                                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                                }
                            }
                        }
                    })
                }
            }
        })

    })



})