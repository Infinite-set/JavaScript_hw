// this is the code for Pijs ch06 self-learnings (part 1)
"use strict";

let obj1 = {name:"Ei", "addr":"Inazuma"};
console.log(Object.getPrototypeOf(obj1) === Object.prototype); //为什么NULL不是Object.prototype的prototype？因为那玩意得手动设置
Object.setPrototypeOf(obj1, null);
console.log(Object.getPrototypeOf(obj1) === null); // 这样就对了

//基于原型的继承
//对于data property，读取行为会反向传播，但是写入不会（而是在当前object上创建一个新的property，只改变这一个值），例如：
const buildDataObject = function(name){
    return {
        name,
        age: 18,
    }
};
const obj2 = buildDataObject("Kokomi");
const obj3 = {name:"Nahida"};
Object.setPrototypeOf(obj3, obj2);
obj3.age = 500;
console.log(obj2.age,obj3.age);
//对于accessor property，读取和写入都会反向传播（原型链上所有object去访问这个值都会变），例如：
/*
const obj4 = {
    aage : 18,
    get age(){
        console.log("get age");
        console.log(this);
        return this.aage; //在javascript中，通过对象的方法访问对象自身属性时，必须采用this.fieldName的方式。原因是javascript中Function是无状态的，访问对象的属性时，必须指定当前的上下文状态，即添加this关键字。
        //那你可能会问，为什么这里不是函数闭包呢？
        //函数闭包是指函数可以访问和操作其词法作用域外部的变量，即使在函数执行完成后，仍然保留对这些变量的引用。闭包通常是**通过在一个函数内部定义另一个函数**，并在内部函数中引用外部函数的变量来创建的。
    },
    set age(val){
        console.log("set age");
        console.log(this); // 是不是要理解为，虽然是从原型链上找到的这个函数，但是因为this是当前object，所以调用的时候输出的依旧是当前object的值？
        this.aage = val;
    }
}
const obj5 = {name:"Nahida"};
Object.setPrototypeOf(obj5, obj4);
obj5.age = 500;
console.log(obj4.age,obj5.age); //18,500
*/
const buildAccessorObject = function(name){
    let my_age = 18;
    return {
        name,
        get age(){
            console.log("get age");
            console.log(name);
            return my_age;
        },
        set age(val){
            console.log("set age");
            console.log(name);
            my_age = val;
        }
    }
}
const obj4 = buildAccessorObject("Kokomi");
const obj5 = {name:"Nahida"};
Object.setPrototypeOf(obj5, obj4);
obj5.age = 500;
console.log(obj4.age,obj5.age); //500,500
console.log(obj5)

//这里是区分了[[prototype]]和构造函数的".prototype"
const Preson = function(name){
    this.name = name;
}
console.log(Object.getPrototypeOf(Preson) === Function.prototype); //true

//这里是介绍了constructor的两个好处：1.可以用于创建新的对象；2.可以用于检测对象的类型（下面的例子只展示了前者）
Preson.prototype.get_name = function(){
    return this.name;
}
const Kokomi = new Preson("Kokomi");
const Gouro = new Kokomi.constructor("Gouro");
console.log(Kokomi.get_name(), Gouro.get_name());

//这里需要借助函数闭包来理解。第92行相当于直接创建了一个新的property，而set、get_age都在对闭包做修改，所以两者完全不是一个变量！
const Person_2 = function(name){
    this.name = name;
    let age = 18;

    this.get_age = () => age;
    this.set_age = v => {
        age = v;
    }
}
let Ayato = new Person_2("Ayato");
Ayato.age = 500;
console.log(Ayato.get_age()); //18
Ayato.set_age(114514);
console.log(Ayato.get_age()); //114514
console.log(Ayato.age); //500

//forEach方法：xxx.forEach(function(item, index, array){...}),其中item是当前元素，index是当前元素的索引，array是当前数组/map/别的对象

//剩下的就不写啦！看ppt吧~