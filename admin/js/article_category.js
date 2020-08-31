$(function() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function(res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('categoryList', res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    })
    // 添加数据
    // 点击按钮的时候，先弹出一个提示框  修改标题
$('#myModal').on('shown.bs.modal', function() {
    $('#myModal h4').text('新增分类')
})

// 单击确定按钮的时候，要发送请求， 添加分类

$('.btn-sure').on('click', function() {
    $.ajax({
        type: 'post',
        url: BigNew.category_add,
        data: $('#myForm').serialize(),

        success: function(res) {
            if (res.code == 201) {
                // 隐藏模态框  并刷新页面
                $('#myModal').modal('hide')
                    // 重新刷新表格
                render()
            }

        }

    })

})