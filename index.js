const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);

//   fetchCoordsByIp(ip , (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
  
//     console.log("It worked! Returned Coordinates: ", coordinates);

//     fetchISSFlyOverTimes({ latitude: '43.78010', longitude: '-79.34790' }, (error, data) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log("It worked! Results: ", data);
//     });
//   });

// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

