$(function(w) {
    var utils = {
            convertToObj: function(str) {
                var arr = str.split('&')
                var obj = {}
                for (var i = 0; i < arr.length; i++) {
                    var temp = arr[i].split('=')
                    obj[temp[0]] = temp[1]
                }
                return obj
            }
        }
        //  暴露数据
    w.utils = utils
}(window))