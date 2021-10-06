const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Migue Chirinos'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Migue Chirinos'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some ghostbuster message',
    title: 'Help',
    name: 'Migue Chirinos'
  })
})

app.get('/weather', (req, res) => {

  const { address } = req.query

  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(address, (error, body) => {
    if(error){
      return res.send('An error occurred.')
    }

    const { latitude, longitude, location } = body
    forecast(latitude, longitude, (forecastError, forecastBody) => {
      if(forecastError){
        return res.send('An error occurred getting forecast.')
      }

      const { message } = forecastBody
      return res.send({ 
        message,
        location,
        latitude,
        longitude
      })
    })
  })
  
})

app.get('/products', (req, res) => {

  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Migue Chirinos'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Migue Chirinos'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})