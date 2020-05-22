/*
 *高阶函数是指至少满足下列条件之一的函数：
 * 函数可以作为参数被传递
 * 函数可以作为返回值输出
 */

{
  // 高阶函数实现 AOP（面向切面编程），主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日记统计、安全控制、异常处理等。
  //在 JavaScript 中实现 AOP 都是指把一个函数“动态织入”到另外一个函数中

  Function.prototype.before = function(beforeFn) {
    let _this = this // 保持原函数引用
    return function() {
      // 返回包含了原函数和新函数的“代理”函数
      beforeFn.apply(this, arguments) // 执行新函数，修正 this
      return _this.apply(this, arguments) // 执行原函数
    }
  }
  Function.prototype.after = function(afterFn) {
    let _this = this // 保持原函数引用
    return function() {
      let ret = _this.apply(this, arguments)
      afterFn.apply(this, arguments)
      return ret
    }
  }

  var func = function() {
    console.log(2)
  }

  func = func
    .before(function() {
      console.log(1)
    })
    .after(function() {
      console.log(3)
    })

  func()
}

{
  // 函数柯里化
  // currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

  // 通var用的柯里化函数
  var curring = function(fn) {
    var args = []
    return function() {
      if (arguments.length === 0) {
        return fn.apply(this, args)
      } else {
        ;[].push.apply(args, arguments)
        return arguments.callee // 指向 arguments 对象的函数，即当前函数
      }
    }
  }
  var cost = (function() {
    var money = 0
    return function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        money += arguments[i]
      }
      return money
    }
  })()

  var cost = currying(cost) // 转化为 currying 函数

  cost(100) // 未真正求值
  cost(200) // 未真正求值
  cost(300) // 未真正求值

  alert(cost()) // 求值并输出 600
}

{
  // 函数节流 - 闸机
  var throttle = function(fn, interval) {
    let _fn = fn
    let timer = null
    let firstFlag = true
    return function() {
      let args = arguments
      let _this = this
      if (firstFlag) {
        _fn.apply(_this, args)
        return (firstFlag = false)
      }
      if (timer) {
        // 如果定时器还在，说明前一次延迟执行还没有完成
        return false
      }
      timer = setTimeout(function() {
        // 延迟一段时间执行
        clearTimeout(timer)
        timer = null
        _fn.apply(_this, args)
      }, interval || 500)
    }
  }
  window.onresize = throttle(function() {
    console.log(1)
  }, 500)
}

{
  // 函数防抖 - 电梯
  var debounce = function(fn, interval) {
    let _fn = fn
    let timer = null
    let firstFlag = true
    return function() {
      let args = arguments
      let _this = this
      if (firstFlag) {
        _fn.apply(_this, args)
        return (firstFlag = false)
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(function() {
        _fn.apply(_this, args)
      }, interval || 500)
    }
  }
}

{
  // 分时函数
  // timeChunk 函数接受 3 个函数，第 1 个参数是总数据，第 2 个参数是封装了处理逻辑的函数，第 3 个参数是每一批处理的数量。
  var timeChunk = function(ary, fn, count) {
    var obj
    var t
    var len = ary.length

    var start = function() {
      for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
        var obj = ary.shift()
        fn(obj)
      }
    }

    return function() {
      t = setInterval(function() {
        if (ary.length === 0) {
          // 如果全部数据已处理完
          return clearInterval(t)
        }
        start()
      }, 200) // 分批执行的时间间隔，也可以用参数的形式传入
    }
  }
}

{
  // 惰性加载函数
  // 方案一：常见的写法
  // 缺点：每次被调用都会执行条件分支
  var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
      return elem.addEventListener(type, handler, false)
    }
    if (window.attachEvent) {
      return elem.attachEvent('on' + type, handler)
    }
  }

  // 方案二：在代码加载时就进行一次判断，让 addEvent 返回一个包裹正确逻辑的函数
  // 缺点：当从头到尾都未用过，形成冗余操作
  var addEvent = (function() {
    if (window.addEventListener) {
      return function(elem, type, handler) {
        elem.addEventListener(type, handler, false)
      }
    }
    if (window.attachEvent) {
      return function(elem, type, handler) {
        elem.attachEvent('on' + type, handler)
      }
    }
  })()

  // 方案三：惰性载入函数
  var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
      addEvent = function(elem, type, handler) {
        elem.addEventListener(type, handler, false)
      }
    } else if (window.attachEvent) {
      addEvent = function(elem, type, handler) {
        elem.attachEvent('on' + type, handler)
      }
    }

    addEvent(elem, type, handler)
  }
}
