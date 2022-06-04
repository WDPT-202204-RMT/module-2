let person = {
  name: "Matteo",
  age: 23,
  favoriteMusic: "Metal",
};

// ES5 way of accessing an object's data
/* let name = person.name;
let age = person.age;
let favoriteMusic = person.favoriteMusic;
console.log(name, age, favoriteMusic); */

// destructuring
//let { name, age, favoriteMusic } = person;
//console.log(name, age, favoriteMusic);

// default values
let person2 = {
  name: "Matteo",
  age: 23,
  favoriteMusic: "Metal",
  country: "France",
};
//let { name, age, favoriteMusic, country = "Italy" } = person;
//console.log(country); => Italy
//let { name, age, favoriteMusic, country = "Italy" } = person2;
//console.log(country); => France

//const name = "Ed";
//let { name: personName, age, favoriteMusic } = person;
//console.log(personName);

let person3 = {
  name: "Matteo",
  age: 23,
  country: "France",
  address: {
    street: "Rue de Paris",
    number: 36,
    city: "Paris",
  },
};

/* let {
  name,
  age,
  address: { street: streetName, number, city },
} = person3;
console.log(streetName);
 */

const campuses = ["madrid", "barcelona", "miami", "paris"];
//const firstCampus = campuses[0]
//const [firstCampus, secondCampus, thirdCampus, fourthCampus] = campuses;
//console.log(firstCampus, secondCampus, thirdCampus);

//const [, second] = campuses; skip first element
//console.log(second);
//const [, , third] = campuses; skip first and second elements
//console.log(third);

/* let fourth = campuses[3];
if (!fourth) fourth = "paris";
console.log(fourth); */
/* const [, , , fourth = "milan"] = campuses; default value for array
console.log(fourth); */

/* const europeanCampuses = [
  ["madrid", "es"],
  ["barcelona", "es"],
  ["berlin", "de"],
  ["paris", "fr"],
  ["amsterdam", "nl"],
  ["lisbon", "pt"],
];

const [[campusSpain], [, campusNation]] = europeanCampuses;

console.log(campusSpain);
console.log(campusNation);
 */

/* const reptiles = ["snake", "lizard", "alligator", ["chameleon"]];
const mammals = ["puppy", "kitten", "bunny"]; */

// const animals = reptiles.concat(mammals); ES5 way

/* const animals = [...reptiles, ...mammals]; ES6 way
console.log(animals); */

//const reptiles2 = reptiles.slice(); ES5 way
/* const reptiles2 = [...reptiles];

reptiles.push("komodo dragon");
console.log(reptiles2); */

/* function myFunction(arg1, arg2) {
  console.log(arg1);
  console.log(arg2);
}
myFunction("first argument", "second argument");
myFunction("first argument", "second argument", "third argument");
 */
/* function add() { ES5 way
  let sum = 0;
  console.log("arguments", arguments);
  for (let i = 0; i < arguments.length; i++) {
    //works because arguments' keys are its indexes
    sum += arguments[i];
  }
  //return arguments.reduce((sum, next) => sum + next); does not work because arguments is not an array
  return sum;
} */

function add(...numbers) {
  //let sum = 0;
  return numbers.reduce((sum, next) => {
    return sum + next;
  }, 0);
  return sum;
}

/* console.log(add()); // 0
console.log(add(1)); // 1
console.log(add(1, 2, 5, 8)); // 16

function showMovie(title, year, ...actors) {
  console.log(actors);
  console.log(
    `${title} is released in ${year} and in the cast are: ${actors[0]} and ${actors[1]}.`
  );
}

showMovie("Titanic", "1997", "Leonardo Di Caprio", "Kate Winslet");
 */
const customer = {
  name: {
    firstName: "ivan",
    lastName: "zoro",
  },
  age: 32,
  preferences: [
    {
      tech: ["cameras", "smartwatches"],
      books: ["science fiction", "coding"],
    },
  ],
};

const {
  name: { firstName, lastName },
  preferences: [
    {
      tech: [, secondTechInterest],
      books,
    },
  ],
} = customer;
/* console.log(secondTechInterest, books, firstName, lastName);
 */
function getFullName({ firstName, lastName }) {
  console.log(`${firstName} ${lastName}`);
}

getFullName(customer.name);
