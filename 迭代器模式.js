/**
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
 */

{
  /*
   * 根据不同浏览器获取相应的上传组件对象
   */

  /*
   * 缺点：难以阅读
   * 严重违反开发-封闭原则
   * 不便增加新的上传方式，如 HTML5 上传
   */

  var getUploadObj = function() {
    try {
    } catch (e) {
      if (supportFlash()) {
        var str = '<object type="application/x-shockwave-flash"></object>'
        return $(str).appendTo($('body'))
      } else {
        var str = '<input name="file" type="file" />>'
        return $(str).appendTo($('body'))
      }
    }
  }
}

{
  /*
   * 迭代器
   * 三个函数有同一个约定：upload 对象可用就返回，否则返回 false，提示迭代器继续往后迭代
   */

  var getActiveUploadObj = function() {
    try {
      return new ActiveXObject('TXFTNActiveX.FTNUpload')
    } catch (e) {
      return false
    }
  }

  var getFlashUploadObj = function() {
    if (supportFlash()) {
      var str = '<object type="application/x-shockwave-flash"></object>'
      return $(str).appendTo($('body'))
    }
    return false
  }

  var getFormUploadObj = function() {
    var str = '<input name="file" type="file" />>'
    return $(str).appendTo($('body'))
  }

  var iteratorUploadObj = function() {
    for (var i = 0, fn; (fn = arguments[i]); ) {
      var uploadObj = fn()
      if (uploadObj !== false) {
        return uploadObj
      }
    }
  }
  var uploadObj = iteratorUploadObj(
    getActiveUploadObj,
    getFlashUploadObj,
    getFormUploadObj
  )
  // 迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前绝大部分预研都内置了迭代器，如 Array.prototype.forEach。
}
