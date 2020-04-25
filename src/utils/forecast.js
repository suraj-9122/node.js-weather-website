const request = require('request')


const forecast = (latitude , longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed82741f3550b193d32a89c2c0620c4b&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url , json : true} , (error, {body}) => {
        
        if(error){
            callback('Unable to connect to weather services!',undefined)
        } else if(body.error){
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined,   body.current.weather_descriptions[0] + ' , ' + ' It is currently '  + body.current.temperature + ' degrees. Humidity : ' + body.current.humidity + ' g/m^3 moisture. Time : ' + body.current.observation_time)
        }
    })
}

module.exports = forecast