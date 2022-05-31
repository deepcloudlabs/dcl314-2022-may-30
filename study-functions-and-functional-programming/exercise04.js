async function fun(){
    return 42;
}

fun().then( (number) => console.log(number) );

async function gun(){
    return 2 * await fun();
}

gun().then( (number) => console.log(number) );
