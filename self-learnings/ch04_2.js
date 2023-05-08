// this is the code for Pijs ch04 self-learnings (part 2)

//object类型：包含0或者多个property，以及一些其他成分。一个property具有一个key和一个value，以及一些其他成分。key只能是且可以是任何string或symbol；value则什么类型的值都可以
//property分两种：data property和accessor property
//object是八大类型中唯一mutable的类型

//object创建方式分三种：object literal（对象字面量）、constructor、function

//object literal，和结构体似的
let myS1 = Symbol("genshin impact");
let obj1 = {
    name: "Yae Miko",
    age: 500,
    addr: "Inazuma",
    [myS1]: "321,123,hhh,aaa", //symbol作为key时，写法必须是一个方括号括着它！（否则会被当做字符串）
}; //空串也可以当作key，使用下面这种无糖形式即可
/*实际上不是这样的，这是一种语法糖！真正的样子是：
let obj1 = {
    ["name"]: "Yae Miko",
    ["age"]: 500,
    ["addr"]: "Inazuma",
    [myS1]: "321,123,hhh,aaa",
};*/
/*也可以进一步用语法糖：
let name = "Yae Miko";
let age = 500;
let obj1 = {
    name,
    age,
};*/
//一种等价形式：
let obj2 = {};
obj2.name = "Yae Miko";
obj2.age = 500;
obj2.addr = "Inazuma";
//但是如果访问obj中不存在的property，会返回undefined（这与访问一个value是undef的property时一样），而不是报错
//相关操作
console.log(obj1.name);
delete obj1.addr; //删除一个property
console.log(obj1);

//function
function createObj(name, age, addr){ //自定义一个返回object的function
    return {
        name,
        age,
        addr,
    }; //这里的三个str就是property（的key）
}
let obj3 = createObj("Nahida", 500, "Sumeru");
console.log(obj3);
let val =  114514; //使用Object() function创建一个object
let obj4 = Object(val); //将val封装为object，这里的obj4是一个Number object，在该object上可以通过valueOf()方法获取原始值
console.log(obj4.valueOf());
let obj5 = Object.create(obj1); //使用Object.create() function创建一个object，注意：Object prototype may only be an Object or null！此方法的特殊之处在于存在**原型链**！与C艹里的继承有点类似
console.log(obj5); //这里的obj5是一个空object，但是它的原型是obj1，所以可以访问obj1的property！所以下面的name依旧是屑狐狸。关于原型链的内容主要在第6章
console.log(obj5.name);

//constructor
let obj6 = new Object(); //这里与obj2有一点区别：是圆括号不是花括号。这样的好处在于依旧有原型链：obj6的原型是Object.prototype
obj2.name = "zhongli";
obj2.age = 6000;
obj2.addr = "Liyue";
//Object仅仅是⼀个特定的constructor。可以根据需要，定义出各种不同的constructor。⼀个function，如果可以作为⼀个constructor，那么，为了触发这个constructor，需要在调⽤这个function时，在前⾯加new
//后面再学这些特性

//accessor property：访问器属性，它不包含data value，而是包含一对get和set函数（不过这两个函数都不是必须的，可以只有一个），这样外部代码就无法直接访问到property的值，而是必然会通过get和set函数来访问

//JS中值的另一种分类方式：falsy value和truthy value，前者包括false、0、-0、NaN、null、undefined、""，后者包括除前者（简记："N0fun"）之外的所有值（自然也包括所有Object了）.这么分类的目的是强制类型转换为boolean时方便

let obj7 = {
    name: "Noelle",
    age: 17,
    addr: "Mondstadt",
};
const obj8 = obj7; //这里直接设置了obj8这个变量指向的东西是“obj7的值”
obj8.name = "Jean"; //const的含义是：变量obj8与其初始化值之间的**引⽤关系**⽆法改变，但这并不表示obj8引用的值不能改变！（不变的是关系，而不是值）
// obj8={}; 就会报错，因为这里改变了obj8与其初始化值之间的引用关系
console.log(obj8)

//JS中非原子类型的值传参时都是传引用