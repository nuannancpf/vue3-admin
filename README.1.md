1， undefined 和null 的区别？
      * undefined ： 代表定义未赋值
      *和null ： 定义并赋值了，值为null

2， 什么时候给变量赋值 null 呢？
      * 初始赋值，表明将要赋值为对象，
      *结束前，让对象成为垃圾对象（被垃圾回收器回收）

3， 严格区别变量类型和数据类型？
      * 数据类型
            基本类型，
            对象类型
      *变量类型
            基本类型
            引用类型
4，typeof 
      数值/字符串/布尔值/undefined/function
      不能区别： null与object, object 与array

5, instaneof   判断对象的具体类型


// 数据_变量_内存
 1，什么是数据
      *存储在内存中代表特定信息的‘东东方’， 本质是0101...

 2，什么是内存
      *内存条通电之后产生的可存储数据的空间（临时的）
      *内存产生和死亡： 内存条（电路板）=>通电=>产生内存空间 =>存储数据 =>处理数据 => 断电=> 内存空间和数据都消失


 3，什么是变量
      *可变化的量，由变量名和变量值组成
      *每个变量都对应一个小内存， 变量名用来查找对应的内存，变量值是内存中保存的数据

 4，内存，数据，变量三者之间的关系




问题： 在js调用函数时传递变量参数时，是值传递还是引用传递
      *理解1: 都是值传递（基本/地址值）传递
      *理解2: 可能是值传递，也可能是引用传递（地址值）


问题： JS引擎如何管理内存？
      1，内存生命周期
            分配小内存空间，得到它的使用权
            存储数据，可以反复进行操作
            释放空间

      2，释放内存
            局部变量：函数执行完自动释放
            对象： 成为垃圾对象==>垃圾回收器回收


// 对象
      1，什么是对象
            *多个对象的封装体
            *用来保存多个数据的容器
            *一个对象代表现实中的一个事物

      2，为什么要用对象
            *统一管理多个数据

      3，对象的组成
            *属性：属性名（字符串）和属性值（任意类型）组成
            *方法：一种特殊的属性（属性值是函数）

      4，如何访问对象内部数据？
            * . 属性名：编码简单，有时不能用
            * ['属性名（字符串）']：编码麻烦， 通用

      问题： 什么情况必须使用 ['属性名（字符串）']的方式？
            1，属性名包含特殊字符： -，空格，
            2，变量名不确定

// 函数
      1，什么是函数
            *实现特定功能的N条语句的封装体
            *只有函数是可以执行的，其他类型的数据不能执行
      2，为什么要用函数
            *提高代码复用
            *便于阅读交流
      3，如何定义函数
            *函数声明
            *表达式
      4，如何调用（执行）函数？
            * test(): 直接调用，
            * obj.test(): 通过对象调用，
            * new test: new 调用
            * test.call.apply(obj): 临时让test 成为obj的方法进行调用

// 回调函数
      1，什么函数才是回调函数？
            1）你定义的
            2）你没有调
            3）但最终执行了
      2，常见的回调函数？
            *dom事件回调函数
            *定时器回调函数

            *ajax请求回调函数
            *生命周期回调函数

// IIFE
      (function(){   // 匿名函数自调用
            console.log('........')
      })()

      作用：
            *隐藏实现
            *不会污染外部（全局）命名空间
            *用它编写JS模块

//This
      1, this是什么？
            * 任何函数本质上都是通过某个对象来调用的，如果没有直接指定就是window
            * 所有函数内部都有一个变量this
            * 它的值是调用函数的当前对象
      2，如何确定this的值？
            * test(): window
            * p.test(): p 
            * new test():创建的对象
            * p.call(obj): obj






// 函数高级

/** 原型与原型链 */

一，原型（prototype)

// 1,函数的prototype属性
      /**每一个函数都有一个prototype属性，它默认指向一个object空对象（既称为：原型对象）*/
            console.log(Date.prototype, typeof Date.prototype)
            function fun(){
            }
            fun.prototype.test= function(){
                  console.log('test()')
            }
            console.log(fun.prototype)  // 默认指向一个Object空对象（没有我们的属性）
      /**原型对象中有一个属性constructor,它指向函数对象 */    ====> 实例对象可以访问
            console.log(Date.prototype.constructor === Date)
            console.log(fun.prototype.constructor === fun)

      var Fun = new fun()
      Fun.test()
// 函数名 Type
// prototype  ----> Type.prototype
//constructor ----> Type


// 2,给原型对象添加属性（一般都是方法）
      /**作用： 函数的所有实例对象自动拥有原型中的属性（方法）*/


二， 显式原型与隐式原型
      function Fn(){ //内部语句: this.prototype === {}

      }
 // 1，每个函数function 都有一个prototype,既 显式原型属性， 默认值是一个空Object对象
      console.log(Fn.prototype)
 // 2，每个实例对象都有一个__proto__, 可称为 隐式原型属性，
      // 创建实例对象
      var fn = new Fn()   // 内部语句：this.__proto__ === Fn.prototype
      console.log(fn.__proto__)
 // 3，对象的隐式原型的值为其对应构造函数的显式原型的值
      console.log(Fn.prototype === fn.__proto__)
// 给原型添加方法
      Fn.prototype.test = function(){
            console.log('test()')
      }
      // 通过实例对象调用原型的方法
      fn.test()
 // 4，内存结构图
      /vue3-Vite-admin/learningImg/prototype.png
 // 5，总结：
      *函数的prototype属性：在定义函数时自动添加的，默认值是一个空Object对象
      *对象的__proto__属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
      *程序员能直接操作显式原型， 但不能直接操作隐式原型（es6之前）



三， 原型链
// 1，原型链（图解答）
/vue3-Vite-admin/learningImg/原型链.png
      *访问一个对象的属性时
            *先在自身属性中查找，找到返回
            *如果没有，再沿着__proto__这条链向上找，找到返回
            *如果最终没有找到，返回undefined
      *别名：隐式原型链
      *作用：查找对象的属性（方法）
// 2，构造函数/原型/实体对象的关系（图解）
vue3-Vite-admin/learningImg/构造函数\\原型\\实体对象的关系.png
// 3，构造函数/原型/实体对象的关系2（图解）
function Fn(){
      this.test1=function(){
            console.log('test1()')
      }
}
Fn.prototype.test2 = function(){
      console.log('test2')
}

var fn = new Fn()
fn.test1()
fn.test2()
console.log(fn.toString())

/**1，函数的显示原型指向的对象默认是空Object 实例对象（但Object不满足）*/
console,og(Fn.prototype instaneof Object) // true
console,og(Object.prototype instaneof Object)  // false
console,og(Function.prototype instaneof Object) // true

/**2，所有函数都是 Function的实例（包含Function）*/
console,og(Function.__proto__ === Function.prototype)

/**3，Object的原型对象是原型链尽头 */
console.log(Object.prototype.__proto__) // null


/** 原型链————属性问题 */
// 1,读取对象的属性值时：会自动到原型链中查找
// 2,设置对象的属性值时：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置值
// 3,方法一般定义在原型中，属性一般通过构造函数定义在对象本身上

function FN(){}
FN.prototype.a = "xxxxx"
var fn1 = new FN()
console.log(fn1.a)
var fn2 = new FN()
fn2.a = "yyyyy"
console.log(fn1.a, fn2.a) // xxxxxx, yyyyy

function Person(name, age){
      this.name =name
      this.age = age
}
Person.prototype.setName = function(name) {
      this.name = name
}
var p1 = new Person('Tom', 12)
p1.setName("Bod")
console.log(p1.name, p1.age)

var p2 = new Person('make', 12)
p2.setName("cat")
console.log(p2.name, p2.age)

console.log(p1.__proto__ === p2.__proto__)




// 探索 instaneof
 /** 1， instaneof是如何判断的 */
      // 表达式：A instaneof B
      // 如果B函数的显示原型对象在A对象的原型链上，返回true,否则返回false
 /** 2， Function 是通过new自己产生的实例*/


 /** 案例1 */
 // /vue3-Vite-admin/learningImg/instaneof 案例1.png
  function Foo(){}
  var foo1 = new Foo()
  console.log(foo1 instaneof Foo)  // true
  console,log(foo1 instaneof Object)// true

 /** 案例2 */
 console.log(Object instaneof Function)   // true
 console.log(Object instaneof Object)     // true
 console.log(Function instaneof Function) // true
 console.log(Function instaneof Object)   // true
 function Foo2(){} 
 console.log(Object instaneof Foo2)       // false
