let original_str = '';

function show(symbol) {
    original_str += symbol;
    input_display.innerHTML = original_str;
}

function reset() {
    out_display.innerHTML = '';
    input_display.innerHTML = '';
    original_str = '';
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

    out_display.innerHTML = Math.round(result * 100) / 100;
}
