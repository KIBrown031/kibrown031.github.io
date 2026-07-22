function getMyCoordinates() {
  // 1. Verify browser compatibility
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by your browser.");
    return;
  }

  // 2. Configure options for maximum accuracy
  const options = {
    enableHighAccuracy: true, // Forces the device to use hardware GPS if available
    timeout: 10000,           // Wait up to 10 seconds for a response
    maximumAge: 0             // Do not use cached location data
  };

  // 3. Request the current coordinates
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
}

// Handles a successful location retrieval
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy; // Measured in meters

  console.log(`Latitude: ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  console.log(`Accuracy: within ${accuracy} meters`);
}

// Handles any errors or permission denials
function errorCallback(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    default:
      console.error("An unknown error occurred:", error.message);
  }
}

// Execute the function
getMyCoordinates();