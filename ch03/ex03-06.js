var foo = {
  name: 'lee',
  age: 25,
  job: 'teacher',
  married: true
};

console.log(foo['name'], foo.age
            , foo.job, foo['married']);
console.log(typeof foo, foo);

var strFoo = JSON.stringify(foo);
console.log(typeof strFoo, strFoo);

var objFoo = JSON.parse(strFoo);
console.log(typeof objFoo, objFoo);