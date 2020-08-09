const request = require("request")



const forecast = (lat, long , callback) => {

const url = 'http://api.weatherstack.com/current?access_key=b6d64a2bcc8a46becdd58cae80d28838&query=' + lat + ',' + long + '&units=m'

request({url, json: true}, (error, { body })=>{
 if (error) {
    callback('Unable to connect to weather service!!', undefined)
 } else if(body.error) {
    callback('Unable find location', undefined)
}
 else{
   callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' out, but feels like ' + body.current.feelslike + '. There is a ' + body.current.precip + '% chance of rain! ')
}
})
}


module.exports = forecast