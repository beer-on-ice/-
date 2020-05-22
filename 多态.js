//多态的思想： 将可变的和不可变的区分开来,“做什么”和“怎么去做”是可以分开的

//多态的含义： 同一个操作作用在不同的对象上，可以产生不同的解释和执行结果

//多态的作用：将过程化的条件分支语句转换为对象的多态性

{
  // 优化前
  let googleMap = {
    show: function() {
      console.log('谷歌')
    }
  }
  let baiduMap = {
    show: function() {
      console.log('开始渲染百度地图')
    }
  }
  var renderMap = function(type) {
    if (type === 'google') {
      googleMap.show()
    } else if (type === 'baidu') {
      baiduMap.show()
    }
  }
  renderMap('google') // 输出：开始渲染谷歌地图
  renderMap('baidu') // 输出：开始渲染百度地图
}

{
  var googleMap = {
    show: function() {
      console.log('开始渲染谷歌地图')
    }
  }

  var baiduMap = {
    show: function() {
      console.log('开始渲染百度地图')
    }
  }
  var renderMap = function(map) {
    if (map.show instanceof Function) {
      map.show()
    }
  }

  renderMap(googleMap) // 输出：开始渲染谷歌地图
  renderMap(baiduMap) // 输出：开始渲染百度地图
}
