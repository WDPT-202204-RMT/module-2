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

function getDirections(index, callback, errors) {
  setTimeout(() => {
    if (!directions[index]) errors('Instructions not found');
    else {
      console.log(directions[index]); // 0 // 1 // 2
      callback();
    }
  }, Math.floor(Math.random() * 1000) + 1);
}

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
