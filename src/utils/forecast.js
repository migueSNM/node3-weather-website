const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cd39aea5dccdc7f89e7dc9624a206a68&query=${latitude},${longitude}`
  
  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather service')
    } else if (body.error){
      callback('Unable to find location')
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current
      const message = weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees.'

      callback(undefined, { message })
    }
  })
}

module.exports = forecast