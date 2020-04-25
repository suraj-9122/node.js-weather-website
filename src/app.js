const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express configuration
const publicdirectory = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicdirectory))

app.get('',(req,res) => {
    res.render('index',{
        title:'weather app',
        name:'suraj kumar'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title:'about us',
        name:'suraj kumar'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title:'help',
        name:'suraj kumar',
        helptext:'some helpful text'
    })
})

app.get('/weather' , (req,res) =>{
    if(!req.query.address) {
        return res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error , forecastdata) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*' , (res,req) => {
    res.render('404',{
        title:'404',
        name:'suraj kumar',
        errormessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404' , {
        title:'404',
        name:'suraj kumar',
        errormessage:'page not found'
    })
})
app.listen(3000 , () => {
    console.log('server is up on port 3000')
})