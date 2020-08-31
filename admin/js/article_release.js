$(function() {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(res) {
            console.log(res);
        }
    })
})