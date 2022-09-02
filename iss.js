const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!error) {
      const data = JSON.parse(body);
      const coordinates = data["ip"];
      callback(null, coordinates);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const link = `http://ipwho.is/${ip}?fields=longitude,latitude,success,message`;
  request(link, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `The coordinates retrieval was ${data.success}. Server says: ${data.message} when getting coordinates.`;
      callback(Error(msg));
      return;
    }
    const {latitude, longitude} = data;
    callback(null, {latitude, longitude});
    
  }
  );
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const link = `https://iss-pass.herokuapp.com/json/?lat=${coords["latitude"]}&lon=${coords["longitude"]}`;
  request(link, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg));
    }
    const data = JSON.parse(body);
    const times = data.response;
    callback(null,times);
  }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error);
      }
      fetchISSFlyOverTimes(coordinates, (error, times) => {
        if (error) {
          callback(error);
        }
        callback(null,times);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};

