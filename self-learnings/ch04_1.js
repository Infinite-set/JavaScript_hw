// this is the code for Pijs ch04 self-learnings (part 1)

//JS宿主环境中存在的⼀个object控制台：可以输⼊/输出⽂本信息
console.log("Hello World!");
//如何运行？要么写一个html文件并设置<script src="ch04.js"></script>（相关信息会输出在F12之后的“控制台/console”栏），要么在命令行中输入node ch04.js（需要安装node.js）

//在JS中，变量没有类型，但是值有类型（类型共8种：undefined null bool number bigint string symbol object），一个变量在任⼀时刻引⽤且只能引⽤⼀个值
//前7种类型（的值）为primitive(原始的) type，意思是immutable，一旦被声明，这个**值**就不会再发生变化了
console.log(typeof(1));
console.log(typeof("hello world"));
console.log(typeof(true));
console.log(typeof(undefined));
console.log(typeof(null));
console.log(typeof(Symbol()));
console.log(typeof(function(){}));
console.log(typeof({}));
console.log(typeof([]));
console.log(typeof(NaN));
console.log(typeof(Infinity));
console.log(typeof(-Infinity));
console.log(typeof(1n));
//result: number string bool undefined object symbol function object object number number number bigint

//变量声明：
var x; 
const y = 1; //此类变量必须初始化

//undefined类型：表示 ⼀个变量的值 ⽬前还未确定
let a;
console.log(a); //缺省值为undef

//null类型：表示 一个变量就是没有值 / 具有⼀个空值
let b = null;
console.log(typeof b); //这是一个神奇的特性

//number类型：8 bytes，编码方式与C艹的双精浮点数相同，基本运算：+ - * / % ** ++ -- (以及 == != > < >= <=)
let c = .42;
console.log(c); //0.42 声明数值时 前/后的0可省略
Number.isInteger(c);
Number.isSafeInteger(c); //判断是不是会因过大/过小而溢出
let d = 5e10; //科学计数法
let e = d.toExponential(); //该⽅法把⼀个数值转换为“以指数形式表示的字符串”
console.log(e);
console.log(typeof e); //string
console.log(c.toFixed(0)); //控制小数点后数字的位数，注意这个函数的调用对象必须是变量，而不是数值本身，如果对数值调用要加括号形成临时变量
console.log(c.toPrecision(1)); //控制有效数字的位数
let f = 0b10101;
let g = 0o377;
let h = 0xff; //进制
console.log(0.1+0.2 == 0.3); //false，因为浮点数的精度问题，所以不要用==来比较浮点数
console.log(Math.abs(0.1+0.2-0.3) < Number.EPSILON); //true，用这个方法来比较浮点数，EPSILON=2^-52
console.log(typeof c/undefined);
console.log(NaN == NaN); //false，NAN是所有类型的所有值中唯一一个不与自己相等的，因此可以用"n!=n"来判断一个数是否为NaN
console.log(1/0); //Infinity
console.log(-1/0); //-Infinity
console.log(1/Infinity); //0
console.log(1/-Infinity); //-0 注意：+0 和 -0 具有不同的编码值，但是在相等判断中，两者是相等的(0==-0 true，想要区分只能用1/0 != 1/-0)
console.log(Infinity/Infinity); //NaN，这一个似乎和C艹一样
console.log(Infinity == Number.POSITIVE_INFINITY); //true

//bigint类型：存放任意精度的整数，变长存储。声明方式：在number类型的值后面加一个"n"
console.log(BigInt("1000114514"));
console.log(1<2n); //bigint值和number值可以混合参与关系运算，但不能混合参与基本算术运算（比如加减乘除）
console.log(1===1n); //false，因为“===”是“全等比较运算”，必须左右值相同且类型也相同才行！

//string类型：字符“串”！js中没有单独的字符！存储方式：UTF-16，每个字符占2个字节（u16），声明用单双引号均可
let i = "114";
let j = '514';
let k = i.concat(j); // k="114514"，这里直接用加号也可以的
console.log(k.indexOf('5'));
console.log(k[4]);
console.log(k.length);
let l = "homo".toUpperCase();
console.log(l);
//⼀个string类型的值，在声明后，其值就不会再发⽣变化（immutable）
// let j = "1919810" 会报错，因为？？？为啥下面这个就可以捏？
j = "1919810";
console.log(j);
//模板字符串，前后要⽤字符 ` 括起来
let m = `Hi, ${f}`;
console.log(m);

//symbol类型：“非常奇怪的类型“，不存在”字面量“，只能通过调用一个构造函数Symbol(str)形成；两次调用返回的值一定不同（但是自己和自己还是相等的），这就带来了一种防伪的方法
let myS1 = Symbol("114514");
let myS2 = Symbol("114514");
console.log(myS1==myS2)

