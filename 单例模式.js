// 定义：保证一个类仅有一个实例，并提供全局访问

// 惰性单例：在需要的时候创建它
const getSingle = fn => {
  let result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}

// 示例
const createLoginLayer = function() {
  let div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

const createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer()
  loginLayer.display.display = 'block'
}
