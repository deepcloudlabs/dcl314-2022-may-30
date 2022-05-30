function dictionary_order_desc(a, b) {
    return b.localeCompare(a);
}

function dictionary_order_asc(a, b) {
    return a.localeCompare(b);
}

// collation
// a -> 1
// b -> 2
// ...
// z -> 27
// s=ş
// ö=o
// "şule" === "sule"
let names = ["zehra", "şule", "şima", "ayşegül", "ali"]
names.sort() // dictionary order
console.log(names)
names.sort(new Intl.Collator('tr').compare)
console.log(names)
// names.reverse()
