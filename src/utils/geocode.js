const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWlndWVzbm0iLCJhIjoiY2t0YzJmMG5jMGV3eTJ1bW9mdGZhM3EwciJ9.F8qE7PY2DYEIr_FajmkSbg&limit=1'

  request({ url, json: true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to location services!')
    } else if (body.features.length === 0) {
      callback('Unable to return location. Try another search')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode