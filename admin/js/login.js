$(function() {
    // 给form表单注册submit事件
    $('.login_form').on('submit', function(e) {
        // 阻止默认请求行为
        e.preventDefault()
            //  发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            //  在data当中，填写上获取到的用户名和密码
            // 使用序列化的方式来获取
            data: $(this).serialize(),

            success: function(res) {
                // 如果请求成功，则跳转到主页面
                // 弹出模态框
                $('#myModal').modal('show')
                    // 显示提示内容
                $('.modal-body p').html(res.msg)
                    //  登录成功之后 单击了确定按钮之后才要跳转到主页面
                if (res.code == 200) {
                    // 给模态框注册一个隐藏触发事件
                    $('#myModal').on('hidden.bs.modal', function(e) {
                        // 跳转到主页面
                        location.href = './index.html'
                    })
                }
            }
        })
    })
})