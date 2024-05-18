import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = '3d734892734fae87e304d6c9b362f7e8';
// let latitude = '';
// let longitude = '';
let city = '';
let country = '';

// Mounting middleware in our app using use method.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/weatherInfo", async (req, res) => {
    // Getting latitude and longitude from the user.
    // latitude = req.body.latitude;
    // longitude = req.body.longitude;
    city = req.body.city;
    country = req.body.country;
    console.log(req.body);

    // Getting the weather data from the OpenWeather.
    // We are passing config directly and params is inside config.
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city, country,
                appid: apiKey
            }
        })
        const data = response.data;
        console.log(data);
        res.render("index.ejs", {content: data});

    } catch (error) {
        res.render("index.ejs", {error: JSON.stringify(error.response.data)});
        console.log(JSON.stringify(error.response.data));
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
