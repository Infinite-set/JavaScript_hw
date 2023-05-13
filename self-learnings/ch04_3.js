// this is the code for Pijs ch04 self-learnings (part 3)
//"use strict"; //这句话的功能之一：给未声明的变量直接赋值时会报错

//Built-in Object：JS中内置的一些对象，即boolean,number,string这三种原子类型的值，JS提供了原生的封装（就是把首字母大写）
let os = new String("genshin impact") //这里如果不加new，就会被看作是function，执行强制类型转换操作
console.log(os)
console.log(typeof os)
//自动装箱（就像C艹里的生成临时对象一样）：当使用原始值调用方法时，后台会创建一个临时对象，将原始值包装起来，从而能够调用方法。这个临时对象只存在于方法调用期间，然后就会立即销毁
//有自动装箱，就有自动拆箱，即从原始值中提取出有效值，这是通过学过的valueOf()方法来完成的
let a = 114.514;
let s = a.toFixed(0) //原子类型的值会自动被封装在object上，方法也是附着在object上
console.log(s)
//其它built-in object：

//Array：可以直接定义，也可以用构造函数
const arr1 = ["Yoimiya", 18, false];
console.log(arr1)
console.log(typeof arr1)
const arr2 = new Array("Kokomi", 18, false); //两种方式完全等价
console.log(arr2)
console.log(typeof arr2)
console.log(arr2.length) // 自带length属性
//当new Array的参数只有一个时，该整数会被解释为数组的长度（从而建立一个空数组）
const arr3 = new Array(4);
const arr4 = new Array(4);
console.log(arr3)
console.log(arr3==[ , , , ]) //报错是因为，==操作比较的是左右两边是否引用了同一个对象，而不是两个对象的内容是否相等，后者需要手动toString
console.log([ , , ,].toString()) //,,
console.log(arr3.toString()==[ , , , ].toString())
console.log(arr3.toString==arr4.toString)
//成员函数：push pop shift unshift splice slice ...
//Array是一种object，所以也可以在Array上添加属性
arr3.name = "Albedo"
console.log(arr3)

//Function(作为constructor时，用于创建function object)
//有三种常用方式创建function object：函数声明declaration，函数表达式expression，arrow function
//函数声明
function I_will_have_order(a,b){
    const c = a+b;
    return c; //当没有return语句时，返回的是undefined
};
//函数作用域：当外部什么都没有时，就是整个文件；当外部是一个代码块时，就是当前代码块；当外部是一个函数时，就是当前函数内的所有地方（包括它前面）
//函数表达式
let TorntoOblivion = function(a,b){
    const c = a-b;
    return c;
};
//箭头函数
let Xiangbuchulaile = (a,b) => a**b; //参数列表的括号：如果只有一个参数时可以不加。函数体的花括号：如果只有一条语句时可以不加
console.log(Xiangbuchulaile(2,3))
console.log(typeof Xiangbuchulaile)
//Function是一种object，所以也可以在Function上添加属性
/*I_will_have_order.name = "zhongli";
console.log(I_will_have_order)这样写会报错，因为此时“我要点菜”是函数指针，不是函数对象*/
TorntoOblivion.name = "Raiden Shogun"; //怪事了，加上use strict之后这里也报错啊……
console.log(TorntoOblivion)

//prototype就放到第6章一块看吧……