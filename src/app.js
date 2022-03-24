const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Miller Rocha'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Miller Rocha'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'This is a help message',
        name: 'Miller Rocha'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address'
        })
    }

    const address = req.query.address;

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({error});
        }
        forecast(latitude, longitude,(error,forecastaData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                latitude,
                longitude,
                forecast: forecastaData
            })
        });
    });
});


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        message:'Article not found',
        name: 'Miller Rocha'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 ERROR',
        message:'Page not found!',
        name:'Miller Rocha'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000.');
});
