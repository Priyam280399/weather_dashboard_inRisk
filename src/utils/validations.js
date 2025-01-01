export const isValidLatitude = (latitude) =>
    !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  
  export const isValidLongitude = (longitude) =>
    !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  