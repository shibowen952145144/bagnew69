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








})