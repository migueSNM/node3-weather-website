const request = require('request')



const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cd39aea5dccdc7f89e7dc9624a206a68&query=${latitude},${longitude}`
  
  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather service')
    } else if (body.error){
      callback('Unable to find location')
    } else {
      console.log(body.current)
      const { temperature, feelslike, weather_descriptions, humidity, wind_speed } = body.current
      const message = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees.
      The humidity is ${humidity} and the wind speed is ${wind_speed} km/h.
      `

      callback(undefined, { message })
    }
  })
}

module.exports = forecast