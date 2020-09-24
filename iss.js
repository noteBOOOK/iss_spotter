/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *    - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *    - An error, if any (nullable)
 *    - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // Error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // If non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {ip} = JSON.parse(body);
    callback(null, ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  // Use request to pass back coordinates from ip argument
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //If non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching results. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).response;
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes };