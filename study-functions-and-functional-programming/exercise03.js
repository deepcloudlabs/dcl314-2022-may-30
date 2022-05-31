function fun(){
    return 42;
}

let result = fun();
console.log("result of the sync function call is "+result);

function async_fun() {
    return new Promise((resolve,reject) => {
        if (Math.random() < 0.5)
           setTimeout(()=>resolve(42), 3000);
        else
           setTimeout(()=>reject("Ooopps! Something is wrong!"), 1000);
    });
}

async_fun().then( (number) => console.log(number) )
           .catch( err => console.error(err));

async_fun().then( (number) => console.log(number) )
    .catch( err => console.error(err));

setInterval( () => console.log("script is doing something else..."), 500);
