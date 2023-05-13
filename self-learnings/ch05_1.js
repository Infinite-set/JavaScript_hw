// this is the code for Pijs ch05 self-learnings (part 1)
"use strict";

//⼀个function也是⼀个object.对object适⽤的操作 也适⽤于function
let arr1 = [];
arr1.push(function(a,b){return a+b;});
console.log(arr1);

//callback function：意为“一个函数被作为参数传递到另一个函数中，等待在这个函数执行时被调用”
const func1 = (func2,txt) => {
    const txt2 = func2(txt);
    console.log(txt2);
}
const func3 = t => t.toUpperCase();
func1(func3,"yelan")
//常用的callback：数组的sort方法，接受一个函数作为参数，该函数需要接受两个值作为参数，然后返回一个数值，如果第一个参数应该排在第二个参数之前，则返回负数，否则返回正数
const arr2 = [1,5,4,8,0];
arr2.sort((a,b) => a-b);
//arr2.sort((a,b) => {if(a<b) return -1; else return 1;}); 这两种写法等价，但是不可以写"a<b"!因为返回值必须是非0数字！（为啥？
console.log(arr2)

//函数参数相关

//调用函数时传递的参数数量可以少于实际定义的参数数量，未传入的值都会是undefined（多传入的值会被忽略）

//"rest"参数：允许函数接受任意数量的参数，这些参数会被放在一个数组中，这个数组必须作为函数的最后一个参数：
let func4 = function(name, ...remaining_data){
    console.log(name);
    console.log(remaining_data);
}
func4("Ei", 90, 60, 170, 240)
//在rest参数的发明之前，使用的是arguments对象，它是一个类数组对象，包含着传入函数中的所有参数，但是它不是一个真正的数组，所以不能使用数组的方法
//当然，也可以直接设置默认值
const func5 = (a=0,b=1)=>{console.log(a,b)}
func5(undefined,2) //这是独特的方法，可以只传入第二个参数，而不传入第一个参数，只需要设置成undef就可以了。但是不能空过去
//forEach方法：接收一个函数，用一个数组上的每个元素作为该函数的参数调用它
//spread操作符：可以将一个数组展开，作为一个函数的参数传入（写法和rest参数类似，但是不是一个含义）
const func6 = (a,b,c) => {console.log(a,b,c)}
const arr3 = [1,2,3];
func6(...arr3); //...arr3等价于1,2,3