// this is the code for Pijs ch05 self-learnings (part 2)
"use strict";

//这是本章的主要内容：函数的四种调用方式

//function context:每次函数调用都会关联一个特定的函数上下文，是object或undef，作为隐式参数传入函数体，参数名称为this

//1.Invoke as a function
function func1(){
    if(this === undefined){ //为啥这里要加全等？“==”不可以吗？
        console.log("context is undefined")
    }
    else if(this === globalThis){ //为啥这里要加全等？“==”不可以吗？答案：因为globalThis是一个object，所以要用全等！！！原来如此啊
        console.log("context is globalThis")
    }
    else{
        console.log("context is ???")
    }
}
let obj1 = {name:"Ei", "addr":"Inazuma"};
let obj2 = {name:"raiden shogun", "addr":"Inazuma"};
console.log(obj1 == obj2)
func1(); //严格模式下是undef，一般模式下是global object
//在此种调用方法下（with严格模式），函数上下文没有什么用处，因为它总是指向global object，所以一般不会这么调用函数

//2.Invoke as a method
//此时在一个object上调用一个函数，函数上下文会被设置为该object，所以可以访问它
//let get_my_context = () => this;
function get_my_context(){return this;}; //太奇怪了，上面这种写法就不行。。。估计与后面要学的东西有关系
let obj3 = {name:"Ei", "addr":"Inazuma", get_my_context};
if(obj3.get_my_context() === obj3){
    console.log("context is obj3");
    console.log(obj3.get_my_context());
}

//3.Invoke as a constructor
//即：在函数调用前加上"new"关键字。
let Person = function(name, age){
    this.name = name; //这两个成员的设置是便于日后访问，如果不加的话，日后访问的结果就是undef。不过print的结果依旧是对的，因为在new一个对象的时候会将object作为上下文，执行其中的所有语句，
    //如果返回值是object则new过程返回该object，否则（返回值是原子类型时，例如undef）返回new出来的object。
    this.age = age;
    this.print = () => console.log(name, age);
};
let obj4 = new Person("Ayaka", 18); //使用new创建的对象，prototype都会指向Person.prototype！也就是说下面访问的print函数是Person.prototype.print，而obj4本身没有这些成员！是沿着原型链追溯上去的。
obj4.print(); 
let obj5 = new Person("Kazuha", 18); //两次调用完全独立，可以看成把函数object复制了两份
//构造函数的命名约定：大写首字母
//如何在函数体内判断函数的调用方式："new.target"，如果加了new操作符则指向new后面的那个function，否则指向undef
let safe_Person = function(name,age){
    if(new.target ===undefined){
        throw new Error("may you show has may you new new?");
        //或者更进一步：我来帮你加
        return new safe_Person(name, age);
    }
    this.name = name;
    this.age = age;
    this.print = () => console.log(name, age);
}
let obj6 = new safe_Person("Kazuha", 18);
//let obj6 = safe_Person("Kokomi", 18); //这里会报错：Error: may you show has may you new new?
//可以这么理解：想要作为constructor调用的话，new是必须的，所以不加的话应该直接报错才对。如果不加new，就只能参考剩下三种调用方式了。

//4.Invoke with the apply or call method/通过apply或call方法被调用，特点：可以随意设置调用函数时的函数上下文
let person = {
    logName: function(){
        console.log(this.name);
        console.log(this.addr);
    },
}
//这里的详细逻辑：首先，person是一个object，它有一个成员logName，是一个函数。然后，我们通过call方法调用了这个函数，call方法的第一个参数是函数的上下文，因此this的值就由我们自行设定了。
let obj7 = {name:"Ei", addr:"Inazuma"};
let obj8 = {name:"raiden shogun", addr:"Inazuma"};
person.logName.call(obj7); //call/apply方法的第一个参数是函数的上下文，后面的参数是函数的参数。apply方法的参数装在一个数组里，call则单列。这就是唯一的区别。
person.logName.call(obj8); //call与apply方法存在于任何函数的原型链中

//bind方法：返回一个新的函数，内部代码不变，不过上下文被固化为传入的参数，也可以顺带固定一些参数的值
const free_func = function(a,b,c){
    console.log(a,b,c);
    console.log(this.name);
}
const bind_func = free_func.bind(obj7, 1, 2); //这里的1,2是参数，obj7是上下文
bind_func(1,1,4);

//特例：箭头函数：不能作为构造函数被调用；没有自己的this，而是会捕获外层（被创建时的环境）的this值，作为自己的this值，且不能使用call/apply/bind方法改变this的值，永不再变
//箭头函数的this值是在**创建**时确定的，而不是在调用时确定的。这就是为什么箭头函数不能作为构造函数被调用的原因。