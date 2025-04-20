import React, { useState, useEffect } from "react";
import { getTodaysWeather, getForecast } from "./getdata";
import { WeatherData, Forecast, ErrorData } from "./types/weather";
import { useRouter } from "next/router";
import { getFormattedDate } from "./dateFormat";

interface PageProps {
  data: WeatherData | ErrorData;
  forecastdata: Forecast | ErrorData;
}

export const getServerSideProps = async (context: any) => {
  const city = context.query.city || "nairobi";
  const units = context.query.units || "metric";
  const { data } = await getTodaysWeather(city, units);
  const { data: forecastdata } = await getForecast(city, units);
  return {
    props: {
      data,
      forecastdata
    },
  };
};

//component that displays the home page
const HomePage: React.FC<PageProps> = ({ data, forecastdata }) => {
  const router = useRouter();
  const [isMetric, setMetric] = useState(true);
  const [city, setCity] = useState(router.query.city || "nairobi");
  const [units, setUnits] = useState(router.query.units || "metric");
  console.log(Date.now());

  const handleSearch = () => {
    router.push(`/?city=${city}&units=${units}`);
  };

  const handleUnitChange = (unit: string) => {
    setUnits(unit);
    setMetric(unit === "metric");
    router.push(`/?city=${city}&units=${unit}`);
  };

  if ("error" in data) {
    return (
      <div>
        <h3>{data.error}</h3>
      </div>
    );
  }
  else if ("error" in forecastdata) {
    return (
      <div>
        <h3>Unable to fetch Forecast</h3>
      </div>
    );
  }

  const imageUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div className="bg-white min-h-screen font-sans p-6">
      <div className="flex min-h-[80vh]">
        <div className="w-1/4 pr-6 border-r border-black flex flex-col justify-between">
          <img src={imageUrl} alt="Weather Icon" className="w-full" />
          {isMetric ? (
            <h3 className="text-xl font-bold text-center mt-2">
              {data.main.temp}°C
            </h3>
          ) : <h3 className="text-xl font-bold text-center mt-2">
            {data.main.temp} F
          </h3>}
          <h3 className="text-xl text-center mt-2 font-bold">
            {data.weather[0].description}
          </h3>
          <h3 className="text-xl text-center mt-30">{getFormattedDate()}</h3>
          <h3 className="text-xl text-center mt-2">{data.name}</h3>
        </div>
        <div className="w-3/4 pl-6">
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search city..."
              className="p-2 rounded-2xl border border-gray-400 w-2/3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <button
              className="bg-white text-black border border-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
              onClick={handleSearch}
            >
              Go
            </button>
            <button
              className="bg-white text-black border border-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
              onClick={() => handleUnitChange("imperial")}
            >
              F
            </button>
            <button
              className="bg-white text-black border border-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
              onClick={() => handleUnitChange("metric")}
            >
              {'\u00b0'}C
            </button>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(forecastdata).map(([date, forecast]) => (
                <div
                  key={date}
                  className="border p-4 rounded-xl shadow-md text-center bg-gray-50 h-60"
                >
                  <h3 className="font-medium">{new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
                    alt="Forecast Icon"
                    className="mx-auto my-2 w-35"
                  />
                  {isMetric ? (
                    <p className="text-2xl">{forecast.average_temp}°C</p>
                  ) : (
                    <p className="text-2xl">{forecast.average_temp} F</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-xl shadow-md text-center bg-gray-50 h-60">
                <h3 className="font-bold">Wind Speed</h3>
                <img src="/static/wind.jpg" alt="humidity icon" className="w-20 h-20 mx-auto mt-4"></img>
                {isMetric ? (
                  <h2 className="text-2xl font-medium mt-8">{data.wind.speed} m/s</h2>
                ): (
                  <h2 className="text-2xl font-medium mt-8">{data.wind.speed} mp/h</h2>
                )}
              </div>
              <div className="border p-4 rounded-xl shadow-md text-center bg-gray-50 h-60">
                <h3 className="font-bold">Humidity</h3>
                <img src="/static/humidity.jpg" alt="humidity icon" className="w-20 h-20 mx-auto mt-4"></img>
                <h2 className="text-2xl font-medium mt-8">{data.main.humidity} %</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
