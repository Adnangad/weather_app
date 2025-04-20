//This function gets todays weather data
export const getTodaysWeather = async (city:string, units: string) => {
    try {
        const res = await fetch(`https://weather-app-goa2.onrender.com/weather/${city}/${units}`);
        if (res.status === 200) {
            const data = await res.json();
            return { data };
        } else {
            return { data: { error: "Unable to fetch weather data" } };
        }
    } catch (error) {
        return { data: { error: "Unable to fetch data from the server" } };
    }
};

//This gets the weather forecast for 3 days
export const getForecast = async (city: string, units: string) => {
    try {
        const res = await fetch(`https://weather-app-goa2.onrender.com/forecast/${city}/${units}`);
        if (res.status === 200) {
            const data = await res.json();
            return { data };
        } else {
            return { data: { error: "Unable to fetch weather data" } };
        }
    } catch (error) {
        return { data: { error: "Unable to fetch data from the server" } };
    }
}
