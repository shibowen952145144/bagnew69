/**
 * 这是一个工具函数 此函数可能与项目无关 
 * 里面存储了很多的常用方法
 */
(function (w) {
  var utils = {
    convertToObj: function (str) {
      // str这个参数是不带? 'id=10&name=tom&age=30'
      var arr = str.split('&')
      // console.log(arr) // ["id=10", "name=tom", "age=20"]
      // 4. 循环遍历数组 再将遍历到的每一项以'='进行切割
      var obj = {}
      for (var i = 0;i < arr.length;i++) {
        var temp = arr[i].split('=') // ['id',10]  ['name','tom'] ['age',20]
        // console.log(temp)
        // 将数组中的第1项做为对象的属性 第2项做为属性值
        obj[temp[0]] = temp[1]  // {id:10,name:'tom',age:20}
        // console.log(obj)
      }
      return obj
    }
  }

  // 向外暴露数据
  // window.utils = utils
  w.utils = utils  // 这个压缩的时候，更方便
})(window)