// 定义：定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换

// 示例： 最初的代码实现
var calculateBouns = function(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBouns('B', 2000) // 40000
calculateBouns('S', 6000) // 24000

// js策略模式
const strategies = {
  S: function(salary) {
    return salary * 4
  },
  A: function(salary) {
    return salary * 3
  },
  B: function(salary) {
    return salary * 2
  }
}

const calculateBouns = (level, salary) => {
  return strategies[level](salary)
}

calculateBouns('S', 20000) // 80000
calculateBouns('A', 30000) // 30000
