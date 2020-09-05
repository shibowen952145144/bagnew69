$(function() {
    // 1. 获取文章列表数据显示在页面中
    // 1.1 获取URL中拼接的参数
    var str = location.search;
    // 1.2  判断是如何跳转过来的 如果直接输入的网址则跳回主页面
    if (!str) {
        // 跳转到主页面
        alert(123)
        window.location.href = './index.html'
        return
    }
    // 1.3 将拼接的字符串转换成对象
    var obj = utils.convertToObj(str)

    // 1.4 要根据参数来进行判断 
    if (obj.id) {
        // 就说明 是通过id发送请求
        var data = { type: obj.id }
    } else {
        // 就说明 是通过关键词来发送请求
        var data = { key: decodeURI(obj.search) }
    }
    // 1.5 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.artilce_list,
        data: data,
        success: function(res) {
            console.log(res);
            if (res.code == 200) {
                if (!res.data.data.length) {
                    $('.setfr').html(`<div class="list_title">
                <h3>暂时没有数据</h3>
                   </div>`);
                } else {
                    if (obj.id) {
                        var str = `<div class="list_title">
              <h3>${res.data.data[0].category}</h3>
               </div>`
                    } else {
                        var str = `<div class="list_title">
              <h3>关键词：${decodeURI(obj.search)}</h3>
               </div>`
                    }

                    var htmlStr = template('articleList', res.data)
                    $('.setfr').html(str + htmlStr)
                }
            }
        }
    })
})