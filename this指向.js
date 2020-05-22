/* 
  *作为对象的方法调用：this 指向该对象

  *作为普通函数调用：全局对象（浏览器中则为 window 对象，严格模式下，是 undefined）

  *构造函数调用：指向返回的对象。特殊情况：若显示返回一个 object 类型的对象，那么此次运算结果最终会返回这个对象；对于显示返回非对象类型的数据，则会依然保持期待的 this。

  * Function.prototype.call 或 Function.prototype.apply 调用：动态改变传入函数的 this，若第一个参数为 null，则函数内的 this 会指向默认的宿主对象（浏览器是 window），但如果是严格模式，则 this 仍为 null。对于目的不在于指定 this 指向，而是借用其他对象的方法，那么可以传入 null 来代替某个具体的对象：Math.max.apply(null, [1, 2, 3])

  * 箭头函数下this指向定义时的父的上下文环境，且不受call/apply的改变，可以使用bind改变
*/
{
  var name = 'window'

  var person1 = {
    name: 'person1',
    show1: function() {
      console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function() {
      return function() {
        console.log(this.name)
      }
    },
    show4: function() {
      return () => console.log(this.name)
    }
  }
  var person2 = { name: 'person2' }

  console.log('-----第一题------')
  person1.show1() //person1
  person1.show1.call(person2) // person2

  person1.show2() //window
  person1.show2.call(person2) //window

  person1.show3()() //window
  person1.show3().call(person2) // person2
  person1.show3.call(person2)() //window

  person1.show4()() //person1   // this指向父的上下文环境
  person1.show4().call(person2) //person1
  person1.show4.call(person2)() //person2

  console.log('-------第二题--------')

  function Person(name) {
    this.name = name
    this.show1 = function() {
      console.log(this.name)
    }
    this.show2 = () => console.log(this.name)
    this.show3 = function() {
      return function() {
        console.log(this.name)
      }
    }
    this.show4 = function() {
      return () => console.log(this.name)
    }
  }
  // new 方法创建对象。
  var personA = new Person('personA')
  var personB = new Person('personB')

  personA.show1() //'personA'
  personA.show1.call(personB) // 'personB'

  // PersonA , 和第一题不同的原因是：new 方法会创建一个新对象，产生构造函数作用域。
  // 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
  personA.show2() // PersonA
  personA.show2.call(personB) // PersonA

  personA.show3()() // window
  personA.show3().call(personB) //personB
  personA.show3.call(personB)() //window

  personA.show4()() // PersonA
  personA.show4().call(personB) // PersonA
  personA.show4.call(personB)() // PersonB
}
