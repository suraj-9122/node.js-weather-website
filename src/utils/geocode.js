const request = require('request')


const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VyYWprdW1hcjU4NjI3IiwiYSI6ImNrOTFzeWhsdjAwZGczZ3NhY2x1ajBlODYifQ.IG8I6gmxOsPy6XnJLwZEUg'

    request({url , json : true} , (error,{body}) => {
    
        if(error){
            callback('Unable to connect to a location services!' , undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. try another search' , undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode