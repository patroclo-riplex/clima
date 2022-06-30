import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [ weather, setWeather ] = useState({});
    const [ isLoading, setIsLoading ]= useState(true);

    const error = () => alert("No es posible acceder a tu ubicación")

    const success = pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=53da044d5440392e62c6922cc9c9a3b5`)
            .then(res => {
                setWeather(res.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);            
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);
    
    const city = weather.name
    const country = weather.sys?.country
    const icon = weather.weather?.[0].icon
    const description = weather.weather?.[0].description;
    const temp = (weather.main?.temp - 273.15).toFixed(2);
    const temp_min = (weather.main?.temp_min - 273.15).toFixed(2);
    const temp_max = (weather.main?.temp_max - 273.15).toFixed(2);
    const feels = (weather.main?.feels_like - 273.15).toFixed(2);
    const speed = weather.wind?.speed
    const humidity = weather.main?.humidity

    return ({ isLoading, city, country, icon, description, temp, temp_min, temp_max, feels, speed, humidity });
};

export default useFetch;