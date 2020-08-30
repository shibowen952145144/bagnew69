$.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        success: function(res) {

            if (res.code == 200) {
                //  将服务器响应回来的昵称显示出来
                $('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                    //  显示登录用户的头像
                $('.user_info img').attr('src', res.data.userPic)
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
    // 让左侧名称高亮显示 本质就是给当前被单击的标签添加类active
    // 给menu下面的所有的level01 div 注册事件
    // $('.menu .level01').on('click', function() {
    //         // 被单击的div要添加类 active 其余的删除类 active
    //         $(this).addClass('active').siblings('div').removeClass('active')
    //         // 当点击文章管理标签的时候 ， 要让ul展开或合并
    //         if ($(this).index() == 1) {
    //             // 让ul有一个展开闭合的切换
    //             $('.menu .level02').slideToggle()
    //                 // 让右侧的小按钮有一个旋转
    //             $(this).find('b').toggleClass('rotate0')
    //         }
    //     })
    //     // 设置文章管理中的子按钮高亮显示
    //     // 给每一个li标签分别注册事件
    // $('.menu .level02 li').on('click', function() {
    //     // 当前被单击的要高亮显示（添加类active）,其它的移除类
    //     $(this).addClass('active').siblings().removeClass('active')
    // })

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
})