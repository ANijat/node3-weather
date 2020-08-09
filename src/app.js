const express = require('express')
const path= require('path')
const hbs=require('hbs')
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express()

//path
const publicDirPath=path.join(__dirname, '../public')
const viewPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')


//set handlevar
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather App',
       name: 'Nijat Aslanov' 
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About App',
        name: 'Nijat Aslanov'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        helptext: 'This is for Help text',
        title: 'Help',
        name: 'Nijat Aslanov'
        
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must provide a address term"})
     }
  
    geocode(req.query.address, (error, {latitude, longitude, Location}={})=>{
        if (error) {
            return res.send({ error})    
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if (error) {
                return res.send({ error})    
            }
            res.send({
                forecast: forecastData,
                Location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({ error: "You must provide a search term"})
    }
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Nijat Aslanov',
        errorMessage: 'help article not found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        name: 'Nijat Aslanov',
        errorMessage: 'Page not found'
    })
})



app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})