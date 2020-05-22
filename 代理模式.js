/**
 * 代理模式的关键是：当客户不方便直接访问一个对象或不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。
 * * 两种代理模式：保护代理和虚拟代理。
 *  * 保护代理：用于控制不同权限的对象对目标对象的访问，但在 JavaScript 并不容易实现保护代理，因为我们无法判断谁访问了对象。
 *  * 虚拟代理：把一些开销很大的对象，延迟到真正需要它的时候才创建。
 * 
 * 单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。而面向对象设计鼓励奖行为分布到细粒度和低内聚的设计。

在面向对象的程序设计中，大多数情况下，若违反其他任何原则，同时将违反开放-封闭原则。

因此，代理负责预加载图片，预加载的操作完成之后，把请求体重新交给本体 MyImage。
 */

{
  //无代理
  let myImage = (function() {
    let imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    let img = new Image()
    img.onLoad = function() {
      imgNode.src = img.src
    }
  })()
}

{
  // 创建图片节点，并添加到html中
  let myImage = (function() {
    let imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
      setSrc: function(src) {
        imgNode.src = src
      }
    }
  })()

  // 图片预加载处理
  let proxyImage = (function() {
    let img = new Image()
    img.onLoad = function() {
      myImage.setSrc(this.src) //图片加载完再赋值到节点
    }
    return {
      setSrc: function(src) {
        myImage.setSrc('***.gif') //设为loading图
        img.src = src
      }
    }
  })()
  proxyImage.setSrc('***.JPG')
}

{
  // 虚拟代理合并http请求
  // 此例可以看为 - 函数节流
  var syncFile = function(id) {
    console.log('开始同步文件，id 为' + id)
  }
  var proxySyncFile = (function() {
    var cache = []
    var timer
    return function(id) {
      cache.push(id)
      if (timer) return
      // 2 秒后向本体发送需要同步的 ID 集合
      timer = setTimeout(function() {
        syncFile(cache.join(','))
        clearTimeout(timer)
        timer = null
        cache.length = 0
      }, 2000)
    }
  })()
  var checkbox = document.getElementsByTagName('input')
  for (var i = 0, c; (c = checkbox[i++]); ) {
    c.onclick = function() {
      if (this.checked === true) {
        proxySyncFile(this.id)
      }
    }
  }
}

{
  //   缓存代理
  // 缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。
  var mult = function() {
    console.log('开启计算')
    var a = 1
    for (var i = 0; (l = arguments.length); i++) {
      a *= arguments[i]
    }
    return a
  }
  var proxyMult = (function() {
    var cache = {}
    return function() {
      var args = Array.prototype.join.call(arguments, ',')
      if (args in cache) {
        return cache[args]
      }
      return (cache[args] = mult.apply(this, arguments))
    }
  })()
  proxyMult(1, 2, 3, 4) // 24
  proxyMult(1, 2, 3, 4) // 24
}

{
  // 缓存代理用于 Ajax 异步请求数据：与计算乘积不同的是，请求数据是个异步操作，无法直接把计算结果放到代理对象的缓存中，而是要通过回调的方式。
  var proxyAjax = (function() {
    var cache = {}
    return function(fn) {
      // fn 作为处理页码数据的函数
      var pageData = cache[page]
      if (pageData) {
        return fn(pageData)
      }
      http
        .getPage(page) // 获取制定页码的数据
        .then(data => {
          cache[page] = data //存放数据
          fn(data)
        })
    }
  })()
}

{
  // 用高阶函数动态创建代理
  // 通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。
  var proxyFactory = (function(fn) {
    let cache = {}
    return function() {
      let args = Array.prototype.join.call(arguments, ',')
      if (args in cache) {
        return cache[args]
      }
      return (cache[args] = fn.apply(this, arguments))
    }
  })()

  var mult = function() {
    console.log('开启相乘')
    var a = 1
    for (var i = 0; (l = arguments.length); i++) {
      a *= arguments[i]
    }
    return a
  }
  var add = function() {
    console.log('开启相加')
    var a = 1
    for (var i = 0; (l = arguments.length); i++) {
      a += arguments[i]
    }
    return a
  }
  var addNum = proxyFactory(add)(1, 2, 3)
  var multNum = proxyFactory(mult)(1, 2, 3)
}

{
  //   其他代理模式
  // 防火墙代理、远程代理、保护代理、智能引用代理、写时复制代理
}
