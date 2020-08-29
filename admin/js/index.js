$(function() {

    // 跳转过来之后立即  发送ajax请求
    //  将获取的用户名和头像渲染到对应的位置
    //  发送ajax请求
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',

        // 除了登录接口之外，其它的后台接口，发送请求的时候，都需要带上token
        // 这个token是需要在请求中设置
        // 只有登录成功了之后，才会有token值

        beforeSend(xhr) {

            xhr.setRequestHeader("Authorization", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDMzMjQxNDQsImlhdCI6MTU5ODUyNDE0NH0.wdogqLEKbkPLz5wasIEI0rxdciYGaxIpY-Da-BOR7gMggqKZf7nksaNtZLKJ4lY8SMHrP5lu-m6kJ87yBfC8lkerUOwIzqCJXcX7F0YMV5Ee_IrdY-Wr-Z55tVs-a9sncMHztk-ySoL7OY4aWhTS5Etq7H5OoEePBa8xMtfeCYM");

        },
        success: function(res) {}
    })
})