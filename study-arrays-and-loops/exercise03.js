function dictionary_order_desc(a,b){
    return b.localeCompare(a);
}
function dictionary_order_asc(a,b){
    return a.localeCompare(b);
}

let names = ["jack", "ben", "jin", "james", "kate", "sun"]
names.sort(dictionary_order_desc) // dictionary order
// names.reverse()
console.log(names)