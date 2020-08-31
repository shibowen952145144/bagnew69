$(function() {

    // 跳转过来之后立即  发送ajax请求
    //  将获取的用户名和头像渲染到对应的位置
    //  发送ajax请求

    $.ajax({
            type: 'get',
            // url: 'http://localhost:8080/api/v1/admin/user/info',
            url: BigNew.user_info,
            beforeSend(xhr) {
                xhr.setRequestHeader("Authorization", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDMzMjQxNDQsImlhdCI6MTU5ODUyNDE0NH0.wdogqLEKbkPLz5wasIEI0rxdciYGaxIpY-Da-BOR7gMggqKZf7nksaNtZLKJ4lY8SMHrP5lu-m6kJ87yBfC8lkerUOwIzqCJXcX7F0YMV5Ee_IrdY-Wr-Z55tVs-a9sncMHztk-ySoL7OY4aWhTS5Etq7H5OoEePBa8xMtfeCYM");
            },
            success: function(res) {
                if (res.code == 200) {
                    //  将服务器响应回来的昵称显示出来
                    $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                        //  显示登录用户的头像
                    $('.sider .user_info img').attr('src', res.data.userPic)
                        // 个人中心旁边的头像也要替换
                    $('.header_bar img').attr('src', res.dara.userPic)
                }
            }
        }) // 给退出按钮注册事件
    $('.header_bar .logout').on('click', function() {
            //  删除本地的  token；
            window.localStorage.removeItem('token')
                // 跳转到登录页面
            window.location.href = './login.html'
        })
        // 3. 实现左侧按钮的高亮显示功能
        // 3.1 给左侧所有的按钮注册事件 
    $('.menu .level01').on('click', function() {
            // 3.2 让被单击的变高亮 其实就是添加了一个active类 其余的变成普通颜色
            $(this).addClass('active').siblings('.level01').removeClass('active')

            // 3.3 当单击的是'文章管理'的这个按钮的时候，应该让ul有一个展开或合并的功能
            // 其实就是一个切换
            if ($(this).index() == 1) {
                // 3.4 让ul展开或合并
                $('.menu .level02').slideToggle()

                // 3.5 让右侧的小三解进行旋转  切换类的操作
                $('.menu .level01:eq(1) b').toggleClass('rotate0')

                // 3.6 默认让子标签的第1个'文章列表'就高亮显示 触发器实现
                $('.menu .level02 li:eq(0)').click()

            }
            // 除了登录接口之外，其它的后台接口，发送请求的时候，都需要带上token
            // 这个token是需要在请求中设置
            // 只有登录成功了之后，才会有token值
        })
        // 给li标签注册事件进行高亮的显示

    $('.menu .level02 li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })



})