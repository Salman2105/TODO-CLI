function greeting(name){
    console.log("Hello " + name);
}
greeting("Alice");

function welcome(callback){
    console.log("before callback");
    callback("salman");
    console.log("callback executed");
}
welcome(greeting);