function Main(a, b){
    while(isNaN(a) || isNaN(b)){
        a = +prompt("1: ");
        b = +prompt("2: ");
    }
    let result = a + b;
    console.log(result);
    return result;
}

Main(+prompt("1: "), +prompt("2: "));