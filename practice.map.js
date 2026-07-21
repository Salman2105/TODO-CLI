const number=[1,2,5,6,8,9];
const show= number.map(num=> num*2);
console.log(show);


const name=["saLman", "ahmed", "alI"]
const showName= name.map(name=> name.toUpperCase());
const showName2=name.map(name=> name.toLowerCase());
console.log(showName);
console.log(showName2);


const students=["bakar","ali","hamza","umer"];
const newStudents = students.filter((name)=> name=== "umer");
console.log(`newStudents: ${newStudents}`);
console.log(`Total new students: ${newStudents.length}`);