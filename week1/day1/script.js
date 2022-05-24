// function func1() {
//   console.log('function1');
// }

// function func2() {
//   console.log('funct2');
// }

// func1();
// func2();

// find a way to pass function 2 as a callback to function 1

function func1(callback) {
  console.log('function1');
  callback();
}

function func2() {
  console.log('funct2');
}

//func1(func2);

// func1(() => {
//   console.log('this is AMAZING');
// });

const directions = [
  'First turn left',
  'Take the second exist',
  'Turn right on Paris street',
  'Go ahead for 2 km',
];

//This is the callback version

// function getDirections(index, callback, errors) {
//   setTimeout(() => {
//     if (!directions[index]) errors('Instructions not found');
//     else {
//       console.log(directions[index]); // 0 // 1 // 2
//       callback();
//     }
//   }, Math.floor(Math.random() * 1000) + 1);
// }

// This is called Callback hell
// getDirections(
//   0,
//   () => {
//     getDirections(
//       1,
//       () => {
//         getDirections(
//           2,
//           () => {
//             getDirections(
//               3,
//               () => {
//                 getDirections(
//                   4,
//                   () => {},
//                   (err) => console.log(err)
//                 );
//               },
//               (err) => console.log(err)
//             );
//           },
//           (err) => console.log(err)
//         );
//       },
//       (err) => console.log(err)
//     );
//   },
//   (err) => console.log(err)
// );

/**
 * * This is the Promise version 1
 */

function getDirections2(index) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (!directions[index]) reject(false);
      else {
        console.log(directions[index]);
        resolve();
      }
    }, Math.floor(Math.random() * 1000) + 1);
  });
}

// getDirections2(0)
//   .then(() => getDirections2(1))
//   .then(() => getDirections2(2))
//   .then(() => getDirections2(3))
//   .then(() => getDirections2(4)) // This will reject
//   .then(() => getDirections2(5)) // This will get skip because we rejected in the past
//   .then(() => getDirections2(6)) // This will get skip because we rejected in the past
//   .then(() => getDirections2(7)) // This will get skip because we rejected in the past
//   .catch((error) => console.log(error)); // Takes as an argument whatever is inside reject()

/**
 * * This is the promise version 2
 */
function getDirections(index) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (!directions[index]) reject(false);
      else {
        resolve(directions[index]); // return/sends the value inside of resolve (this will get send to the .then function)
      }
    }, Math.floor(Math.random() * 1000) + 1);
  });
}

// Natalia's question
// getDirections(0).then((value) => {
//   console.log(value);
//   getDirections2(1)
//     .then(() => getDirections2(2))
//     .then(() => getDirections2(3));
// });

// getDirections(0).then((value) => {
//   console.log(value);
//   getDirections(1).then((value) => {
//     console.log(value);
//     getDirections(2).then((value) => {
//       console.log(value);
//       getDirections(3).then((value) => {
//         console.log(value);
//         getDirections(4)
//           .then((value) => console.log(value))
//           .catch((err) => console.log(err));
//       });
//     });
//   });
// });

/**
 * * Promise.all allows us to exectute all the promises at the same time.
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('foo'), 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1337), 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve({ name: 'Bob' }), 4000);
});

//Promise.all([p1, p2, p3]).then((value) => console.log(value));

/**
 * * Async / Await syntax
 */

// async function getInstructions() {
//   try {
//     await getDirections2(0);
//     await getDirections2(1);
//     await getDirections2(2);
//     await getDirections2(3);
//     await getDirections2(4); // This rejects
//     await getDirections2(5); // This rejects

//     console.log('first'); // This this gets skiped
//   } catch (err) {
//     alert(err);
//   }
// }

// getInstructions();

async function getInstructions2() {
  try {
    let res1 = await getDirections(0);
    console.log(res1);
    let res2 = await getDirections(1);
    console.log(res2);
    await getDirections(2);
    let res3 = await getDirections(2);
    console.log(res3);

    await getDirections(3);
    let res4 = await getDirections(3);
    console.log(res4);

    await getDirections(4); // This rejects
    // await getDirections(5); // This rejects

    console.log('first'); // This this gets skiped
  } catch (err) {
    console.log('STOPP ! THERE IS AN ISSUE');
  }
}

getInstructions2();
