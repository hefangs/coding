

# 继承

## ES5继承

## 1.原型链继承

**将子类的原型对象指向父类的实例**

优点：
- 继承了父类的模板，又继承了父类的原型对象

缺点：
- 如果要给子类的原型上新增属性和方法，就必须放在`Student.prototype = new Person()`这样的语句后面
- 创建子类时，无法向父类构造函数传参
  
```js
function Person(name,age) { 
    this.name = name
    this.age = age
}
Person.prototype.run = function() {
    console.log(`${this.name}-${this.age}`)
}
function Student(sex) {
    this.sex = sex
}
Student.prototype = new Person('张三',"20")
Student.prototype.constructor = Student
Student.prototype.run = function() {
    console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run() // 学生信息: 张三-20-男
```


## 2.构造函数继承

**在子类构造函数内部使用call或apply来调用父类构造函数**

优点：
- 解决了原型链继承中子类实例共享父类引用对象的问题，实现多继承
- 创建子类实例时，可以向父类传递参数
  
缺点：
- 构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

```js
function Person (name,age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function () {
  console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  this.sex = sex
  Person.call(this,"张三",20)
}
Student.prototype.run = function () {
   console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run() // 学生信息: 张三-20-男
```



## 3.组合继承

**原型链继承+构造继承**

优点：
- 可以继承父类实例属性和方法，也能够继承父类原型属性和方法
- 弥补了原型链继承中引用属性共享的问题
- 可传参，可复用
  
缺点：
- 使用组合继承时，父类构造函数会被调用两次
- 并且生成了两个实例，子类实例中的属性和方法会覆盖子类原型(父类实例)上的属性和方法，所以增加了不必要的内存

```js
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function(){
    console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  Person.call(this, '张三',20)
  this.sex = sex
}
Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.run = function(){
   console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run()   // 学生信息: 张三-20-男

```



## 4.寄生式继承

**寄生组合继承算是`ES6`之前一种比较完美的继承方式**

优点：
- 只调用了一次父类构造函数，只创建了一份父类属性
- 子类可以用到父类原型链上的属性和方法

```js
function Person (name,age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function () {
  console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  this.sex = sex
  Person.call(this,'张三',20)
}
// 与组合继承的区别
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
Student.prototype.run = function(){
  console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}

var s1 = new Student('男')

s1.run()  // 学生信息: 张三-20-男
```


## ES6继承
**主要是依赖`extends`关键字来实现继承，且继承的效果类似于寄生组合继承**


```js
class Person {
  constructor (name,age) {
    this.name = name
    this.age = age
  }
  run () {
     console.log(`学生信息: ${this.name}-${this.age}`)
  }
}
class Student extends Person {
  constructor (name,age,sex) {
    super(name,age)
    this.sex = sex
  }
  run(){
    console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
  }
}
var s1 = new Student('张三',20,'男')
s1.run()  //   学生信息: 张三-20-男
```