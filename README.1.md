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




// ------ 执行上下文与执行上下文栈------
  //一，变量提升与函数提升
      /** 1，变量声明提升
            * 通过var 定义（声明）的变量，在定义语句之前就可以访问到
            * 值：undefined
      */
      /** 2，函数声明提升
            * 通过function声明的函数，在之前就可以直接调用
            *值：函数定义（对象）
      */
      /** 3，问题：变量提升和函数提升是如何产生的？*/

      /** 面试题：输出 undefined */
      var a =3
      function fn(){
            console.log(a)
            var a = 4
      }
      fn()
  // 二， 执行上下文
      /** 1，代码分类（位置）
            *全局代码
            *函数代码
       */
      /** 2，全局执行上下文
            *在执行全局代码前将window确定为全局执行上下文
            *对全局数据进行预处理
                  *var 定义的全局变量 ===> undefined, 添加为window的属性
                  *function 声明的全局函数 ===> 赋值（fun),添加为window的方法
                  *this ===> 赋值（Window)
            *开始执行全局代码
       */
      /** 3，函数执行上下文
            *在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象
            *对局部数据进行预处理
                  *形参变量 ===> 赋值（实参）===>添加为执行上下文的属性
                  *arguments ===>赋值（实参列表），添加为执行上下文的属性
                  *var定义的局部变量 ===> undefined,添加为执行上下文的属性
                  *function 声明的函数 ===>赋值（fun),添加为执行上下文的方法
                  *this ===> 赋值（调用函数的对象）
            *开始执行函数体代码
       */
      consolelog(a1)
      console.log(a2)
      console.log(this)
      var a1 =3
      function a2(){}

      /** 面试题*/
      console.log('global begin' +i)
      var i =1
      foo(1)
      function foo(i){
            if(i==4)return
            console.log('foo() begins'+i)
            foo(i+1)
              console.log('foo() end'+i)
      }
       console.log('global ends'+i)
      /** */
      /** */


//  作用域、作用域链
// 一，作用域
      /**1，理解
            *就是一块“地盘”，一个代码段所在段区域
            *它是静态的（相对于上下文对象），在编写代码就确定了
       */
      /**2，分类
            *全局作用域
            *函数作用域
            *es6之后新增的块级作用域
       */
      /**3，作用：
            *隔离变量，不同作用域下同名变量不会有冲突
       */
      var a = 10,
            b = 20
      function fn(x){
            var a = 100,
                  c=300
                  console.log('fn()',a,b,c,x)
            function bar(x){
                  var a = 1000,
                        d=400
                  console.log('bar()',a,b,c,d,x)
            }
            bar(100)
            bar(200)
      }
      fn(10)
      
// 作用域链
       /**1，理解
            *多个上下级关系的作用域形成的链，它的方向是从下往上（从内往外）
            *查找变量时就是沿着作用域链来查找的
       */
      /**2，查找一个变量的查找规则
            *在当前作用域下的执行上下文中查找对应的属性，如果有直接返回，否则进入2
            *在上一级作用域的执行上下文中查找对应的属性，如果有直接返回，否则进入3
            *再次执行2的相同操作，直到全局作用域，如果还找不到就抛出找不到的异常
       */
      var a =1
      function fn1(){
            var b =2
            function fn2(){
                  console.log(c)
                  console.log(b)
                  console.log(a)
                  console.log(d)
            }
            fn2()
      }
      fn1()
      /** */

// 闭包
// 一，闭包理解
      /**1,如何产生闭包？
            *当一个嵌套的内部（子）函数引用来嵌套的外包（父）函数的变量时，就产生了闭包
       */
      /**2,闭包到底是什么？
            * 所以chrome 调试查看
            *理解一：闭包是嵌套内部的函数（绝大部分人）
            *理解二：包含被引用变量（函数）的对象（极少数人）
            *注意：闭包存在于嵌套的内部函数中
       */
      /**3，产生闭包的条件 
            *函数嵌套
            *内部函数引用了外部函数的数据（变量/函数）
      */
      function fn1(){
            var a =2
            function fn2(){  // 执行函数定义就会产生闭包(不用调用内部函数)
                  console.log(a)
            }
      }
      fn1()
      /** */
// 二，常见的闭包
      /**1，将函数作为另一个函数的返回值 */
      /**2，将函数作为实参传递给另一个函数调用*/
      Function fn1(){
            var a =2
            function fn2(){
                  a++
                  console.log(a)
            }
            return fn2
      }
      var f =fn1()
      f() // 3
      f() // 4

// 三，闭包的作用
      /** 1，使用函数内部的变量在执行完毕后，仍然存活在内存中（延长了局部变量的生命周期） */
      /** 2，让函数外部可以操作（读写）到函数内部的数据（变量/函数） */

      /**问题：
            *1，函数执行完后，函数内部声明的局部变量是否还存在？
                  // 一般不存在，存在于闭包中的变量才可能存在
            *2，在函数外部能直接访问函数内部的局部变量吗？
                  // 不能，但我们可以通过闭包让外部操作它
       */
      // eg:
            function fn1(){
                  var a = 2
                  function fn2(){
                        a++
                        console.log(a)
                  }
                  function fn3(){
                        a--
                        console.log(a)
                  }
                  return fn3
            }
            var f = new fn1()
            f()
            f()
// 四，闭包的生命周期
      <!--
      1, 产生：在嵌套内部函数定义执行完毕时就产生了（不是在调用）
      2, 死亡：在嵌套的内部函数成为垃圾对象时
      -->
      <!--
      eg:
            function fn1(){
                  // 此时闭包就已经产生了（函数提升，内部函数对象已经创建了）
                  var a = 2
                  function fn2(){
                        a++
                        console.log(a)
                  }
                  return fn2
            }
            var f = new fn1()
            f()
            f()
            f = null // 闭包的死亡 （包含闭包的函数对象成为垃圾对象）
      -->
<!--
五，闭包的应用_自定义JS模块

      闭包的应用2: 定义JS模块
            *具有特定功能的js 文件  // /vue3-Vite-admin/learningImg/index.html ====> /vue3-Vite-admin/learningImg/myModule.js
            *将所有的数据和功能都封装在一个函数内部（私有的）
            *只向外暴露一个包信n个方法的对象或函数
            *模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能
-->

<!--
六，闭包的缺点及解决
      1.缺点：
            *函数执行完后，函数内的局部变量没有释放，占用内存空间会变长
            *容易造成内存泄露
      2.解决：
            *能不用闭包就不用
            *及时释放
      
      eg: 
            function fn () {
                  var arr = new Array[10000]
                  function fn2(){
                        console.log(arr.length)
                  } 
                  return fn2
            }
            var f = fn()
            f()
            f = null  // 让内部函数成为垃圾对象 ----》回收闭包


 内存溢出与内存泄露
      1，内存溢出
            *一种程序运行出现的错误
            *当程序运行需要的内存超过了剩余内存时，就会抛出内存溢出的错误
            eg:
            var obj = {}
            for(var i=0; i<1000;i++){
                  obj[i] = new Array[10000]
                  console.log('----------')
            }
      2，内存泄露
            *占用的内存没有及时释放
            *内存泄露积累多了就容易导致内存溢出
            *常见的内存泄露：
                        *意外的全局变量
                        *没有及时清理的计时器或回调函数
                        *闭包
            //eg :
            //*意外的全局变量
                  function fn () {
                        a =2
                        console.log(a)
                  }
                  fn()
            //*没有及时清理的计时器或回调函数
                 var intervalId = setInterval(function(){ // 启动循环定时器后不清理
                        console.log('setInterval =======>')
                  },1000)
                  clearInterval(intervalId) // 清理定时器

             // *闭包
                  function fn1(){
                        var a =3
                        function fn2(){
                              console.log(a++)
                        }
                        return fn2
                  }
                  var f =fn1()
                  f()
 -->

<!--  闭包面试题
      // 代码面试题1
            var name = 'the window'
            var object = {
                  name: 'my object',
                  getNameFunc: function(){
                        return function(){
                              return this.name
                        }
                  }
            }
            alert(object.getNameFunc()())

            var name2 = 'the window'
            var object2 = {
                  name2: 'my object',
                  getNameFunc: function(){
                        var that = this
                        return function(){
                              return that.name2
                        }
                  }
            }
            alert(object2.getNameFunc()())


      // 代码面试题2 
            function fun (n,o){
                  console.log(o)
                  return {
                        fun: function(m){
                              return fun(m,n)
                        }
                  }
            }
            var a = fun(0); a.fun(1);a.fun(2);a.fun(3); // undefined, 0 , 0, 0
            var b = fun(0).fun(1).fun(2).fun(3); // undefined, 0 , 1, 2
            var c = fun(0).fun(1); c.fun(2);c.fun(3); // undefined, 0 , 1, 1
-->



<!--
  对象创建模式：
            01，object 构造函数模式
                  方式一：object 构造函数模式
                        套路：先创建空object对象，再动态添加属性/方法
                        适用场景：起始时不确定对象内部数据
                        问题：语句太多
                  /** 一个人 name:"tom",age:12
                        var p = new Object()
                        p,name = "tom",
                        p.age = 12,
                        p.setName = function (name){
                              this.name = name
                        }
                  */
            02, 对象字面量
                  方式二：对象字面量模式
                        套路：使用{}创建对象，同时指定属性/方法
                        适用场景：起始时对象内部数据是确定的
                        问题：如果创建多个对象，有重复代码

                  /** 
                        var p = {
                              name:'tom',
                              age: 12,
                              setName: function (name){
                                    this.name = name
                              }
                        }
                        //测试
                        console.log(p.name,p.age)
                        p.setName('jack')
                        console.log(p.name,p.age)
                   */

            03，工厂模式
                  方式三：工厂模式
                        套路：通过工厂函数动态创建对象并返回
                        适用场景：需要创建多个对象
                        问题：对象没有一个具体类型，都是Object类型
                  
                  /**
                        function createPerson(name,age){
                              var obj = {
                                    name,
                                    age,
                                    setName: function(name){
                                          this.name = name
                                    }
                              }
                              return obj
                        }

                        //创建两个人
                        var p1 = createPerson('tom', 24)
                        var p2 = createPerson('king', 24)
                   */
            方式四：自定义构造函数模式
                  套路：自定义构造函数，通过new创建对象
                  适用场景：需要创建多个类型确定的对象
                  问题：每个对象都有相同的数据，浪费内存
                  /**
                        function Person(name,age) {
                              this.name = name
                              this.age = age
                              thos.setName = function(name){
                                     this.name = name
                              }
                        }
                   */
            方式五：构造函数+原型的组合模式
                  套路：自定义构造函数，属性在函数中初始化，方法添加在原型上
                  适用场景：需要创建多个类型确定的对象
                  /**
                        function Person(name,age) {
                              this.name = name
                              this.age = age
                        }
                        Person.prototype.setName = function(name){
                                     this.name = name
                        }
                        var p1 = new Person('tom',24)
                        var p2 = new Person('jack',34)
                   */
-->

<!--
      继承模式
            方式1:原型链的继承
            
                  1.套路：
                        1，定义父类型构造函数
                        2，给父类型的原型添加方法
                        3，定义子类型构造函数
                        4，创建父类型的对象赋值给子类型的原型
                        5，将子类型原型的构造属性设置为子类型
                        6，给子类型原型添加方法
                        7，创建子类型的对象：可以调用父类型的方法
                  2，关键
                        1，子类型的原型为父类型的一个实例对象
            
            /**
                  // 父类型
                  function Supper(){
                        this.supProp = "Supper property"
                  }
                  Supper.prototype.showSupperProp = function(){
                        console.log(this.supProp)
                  }
                  // 子类型
                  function Sub() {
                        this.subProp = "Sub property"
                  }
                  //子类型的原型为父类型的一个实例对象
                  Sub.prototype = new Supper()
                  //让子类型的原型的constructor指向子类型
                  Sub.prototype.constructor = Sub
                  Sub.prototype.showSubProp = function(){
                        console.log(this.subProp)
                  }

                  var sub = new Sub()
                  sub.showSupperProp

                  图解：/vue3-Vite-admin/learningImg/原型链继承.png
             */

            方式2: 借用构造函数继承（假的）
                  1，套路：
                        1，定义父类型构造函数
                        2，定义子类型构造函数
                        3，在子类型构造函数中调用父类型构造函数
                  2，关键：
                        1，在子类型构造函数中通用supper()调用父类型构造函数
                  function Person(name,age){
                        this.name = name
                        this.age = age
                  }
                  Person.prototype.setName = function(name){
                        this.name = name
                  }
                  function Student(name,age,price){
                        Person.call(this, name, age)  // 相当于 this.Person(name,age)
                        this.price = price
                  }
                   Student.prototype = ne Person() // 为了能看到父类型的方法
                   Student.prototype.constructor = Student  // 修正constructor属性
                  Student.prototype.setPrice = function(price){
                        this.price = price
                  }
                  var s = new Student('tom',20,14000)
                  s.setName('king')
                  s.setPrice(100)
                  console.log(s.name,s.age,s.price)
-->

<!--
      进程与线程


            线程:是进程内的一个独立执行单元
                 是 程序执行的一个完整流程
                 是cpu 最小的调度单元

-->
