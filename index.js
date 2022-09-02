const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("96.48.132.16", (error, coordinates) => {
//   if (error) {
//     console.log("rip error" , error);
//     return;
//   }

//   console.log('Coordinates:' , coordinates);
//   return;
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000'}, (error,times) => {
//     if (error) {
//     console.log("rip error" , error);
//     return;
//   }

//   console.log('Returntimes:' , times);
//   return;
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});



