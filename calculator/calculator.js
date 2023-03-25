let original_str = '';
/*
let stack_num = new Array();
let stack_mark = new Array();
let box = new Array();
let len_str = 0;
let len_num = 0;
let len_mark = 0;
let result = 0;
*/

function show(symbol) {
    original_str += symbol;
    input_display.innerHTML = original_str;
}//接收表达式

function reset() {
    out_display.innerHTML = '';
    input_display.innerHTML = '';
    original_str = '';
    /*
    stack_num.length = 0;
    stack_mark.length = 0;
    len_str = 0;
    len_num = 0;
    len_mark = 0;
    result = 0;
    //alert(str[0]);
    */   
}

function calc_result() {
    //transfer "1+14+51+4" to (1)(+)(14)(+)(51)(+)(4)
    let neg_flag = 0;//deal with case like "-1+2="
    let preprocessed_str = new Array();
    for (let i = 0, j = 0; i < original_str.length; i++) {
        if (original_str[i] == '+' || original_str[i] == '-' || original_str[i] == '*' || original_str[i] == '/') {
            if (i == 0 || (i > 0 && (original_str[i - 1] == '+' || original_str[i - 1] == '-' || original_str[i - 1] == '*' || original_str[i - 1] == '/'))) {
                if (original_str[i] == '-')
                    neg_flag = 1;
            }
            else {
                preprocessed_str[j] = original_str[i];
                j++;
            }
        }
        else {
            let num = '';
            let end = 0;
            if (neg_flag == 1) {
                num += '-'
                neg_flag = 0;
            }
            for (let k = i; original_str[k] != '+' && original_str[k] != '-' && original_str[k] != '*' && original_str[k] != '/' && k < original_str.length; k++) {
                num += original_str[k];
                end++;
            }
            i = i + end - 1;
            preprocessed_str[j] = parseFloat(num);
            j++;
        }
    }
    // first process * & /
    tmp_str = new Array()
    for (let i = 0; i < preprocessed_str.length; ++i) {
        if (preprocessed_str[i] == '*' || preprocessed_str[i] == '/') {
            let a=tmp_str.pop();
            let b=preprocessed_str[i+1];
            let c=0;
            if (preprocessed_str[i]=='*')
                c=a*b;
            else
                c=a/b;
            tmp_str.push(c)
            i=i+1;
        }
        else tmp_str.push(preprocessed_str[i])
    }
    // then process + & -
    let result=0;
    for (let i=0;i<tmp_str.length;++i){
        if(tmp_str[i]=='+'){
            result+=tmp_str[i+1];
            i=i+1;
        }
        else if(tmp_str[i]=='-'){
            result-=tmp_str[i+1];
            i=i+1;
        }
        else{
            result=tmp_str[i];
        }
    }

    /*
    for (let i = 0; i <= preprocessed_str.length; i++) {
        if (preprocessed_str[i] == '+' || preprocessed_str[i] == '-') {
            stack_mark[len_mark] = preprocessed_str[i];
            len_mark++;
        }
        else if (preprocessed_str[i] == '*' || preprocessed_str[i] == '/') {
            let a, b, c;
            a = stack_num[stack_num.length - 1];
            b = preprocessed_str[i + 1];
            if (preprocessed_str[i] == '*') {
                c = a * b;
                stack_num[len_num - 1] = c;
                i++;
            }
            if (preprocessed_str[i] == '/') {
                c = a / b;
                stack_num[len_num - 1] = c;
                i++;
            }
        }
        else {
            stack_num[len_num] = preprocessed_str[i];
            len_num++;
        }
    }

    for (let j = 0; j < stack_num.length; j++) {
        console.log(stack_num[j]);
    }

    for (let k = 0; k < stack_mark.length; k++) {//???????
        console.log(stack_mark[k]);
    }
    console.log(stack_mark.length);
    console.log(stack_num.length);
    stack_num.length--;
    console.log(stack_num.length);
    len_num = stack_num.length;
    console.log(len_num);

    for (let i = 0, j = 1; i <= len_mark - 1; i++, j++) {
        if (stack_mark[i] == '+') {
            var num1;
            num1 = Number(stack_num[0]) + Number(stack_num[j]);
            //stack_num.length = stack_num.length - 1;
            stack_num[0] = num1;
            //stack_mark.length = stack_mark.length - 1;
        }
        else if (stack_mark[i] == '-') {
            var num2;
            num2 = Number(stack_num[0]) - Number(stack_num[j]);
            //stack_num.length = stack_num.length - 1;
            stack_num[0] = num2;
            //stack_mark.length = stack_mark.length - 1;
        }
        // console.log(len_num);
    }

    console.log(stack_num[0]);
    result = stack_num[0];

    */
    out_display.innerHTML = result;//写在另一个函数中为啥不对?????
}
