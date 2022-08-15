var array = [3 ,1, 2, 2, 1, 3, 5];
var b = []; // [3, 1, 2]

for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
        if(array[i] === array[j]){
            b.push(array[i])
        }
    }
}

const c = array.filter((item)=>{
   return !b.includes(item)
})

console.log(c);