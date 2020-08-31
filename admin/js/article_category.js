$(function() {

    render()

    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function(res) {
                if (res.code == 200) {
                    var htmlStr = template('categoryList', res)

                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    $('#myModal').on('shown.bs.modal', function(e) {
        if (e.relatedTarget.id == 'xinzengfenlei') {
            // 新增按钮
            $('#myModal h4').text('新增文章分类')
                //    将表单重置
            $('#myForm')[0].reset()
                //  手动清空id
            $('#myForm input[name=id]').val('')

        } else {
            // 编辑按钮
            $('#myModal h4').text('更新文章分类')

            $.ajax({
                type: 'get',
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data('id')
                },
                success: function(res) {
                    $('#myForm input[name=id]').val(res.data[0].id)
                    $('#myForm input[name=name]').val(res.data[0].name)
                    $('#myForm input[name=slug]').val(res.data[0].slug)
                }
            })
        }
    })

    $('#myModal .btn-sure').on('click', function() {

            var id = $('#myForm input[name=id]').val()
            $.ajax({

                type: 'post',

                url: id ? BigNew.category_edit : BigNew.category_add,
                data: $('#myForm').serialize(),
                success: function(res) {

                    if (res.code == 201 || res.code == 200) {

                        // 隐藏模态框 并刷新页面
                        $('#myModal').modal('hide')
                            // 重新刷新表格
                        render()
                    }
                }
            })
        })
        // 删除分类
    $('#delModal').on('shown.bs.modal', function(e) {
        // console.log(e.relatedTarget);
        window.categoryId = $(e.relatedTarget).data('id') // data()专门用来获取当前标签中的data-属性的值
            // var id = $(e.relatedTarget).attr('data-id')
    })

    $('#delModal .btn-del').on('click', function() {
        // console.log(1122);
        // 3.2 发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: window.categoryId
            },
            success: function(res) {
                // 3.3 隐藏模态框
                if (res.code == 204) {
                    $('#delModal').modal('hide')

                    // 3.4 重新刷新局部页面
                    render()
                }

            }
        })
    })

})