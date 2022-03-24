const request = require('request');

const forecast = (longitude,latitude,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b66284052350267ce859195e6d2cb54c&query=${longitude},${latitude}`;

    request({ url, json: true },(error,{body})=>{
        if(error){
            callback('Unable to connect to wather service!',undefined);
        }else if(body.error){
            callback(body.error.info,undefined);
        }else{
            const {weather_descriptions,temperature,feelslike,humidity, wind_speed} = body.current; 
            callback(undefined,`${weather_descriptions[0]}, It is currently ${temperature} °C and outside feels like ${feelslike} °C, humidity is ${humidity}% and wind speed is ${wind_speed} km/h`);
        }
    });
}

module.exports = forecast;