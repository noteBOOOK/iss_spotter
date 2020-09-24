const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP: ", ip);

  fetchCoordsByIp(ip , (error, coordinates) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
  
    console.log("It worked! Returned Coordinates: ", coordinates);

    fetchISSFlyOverTimes({ latitude: '43.78010', longitude: '-79.34790' }, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      console.log("It worked! Results: ", data);
    });
  });

});



