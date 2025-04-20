import React, { useState, useEffect } from "react";
import { getTodaysWeather } from "./getdata";
import { Props } from "./types/weather";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: any) => {
  const city = context.query.city || "nairobi";
  const units = context.query.units || "metric";
  const { data } = await getTodaysWeather(city, units);
  return {
    props: { data },
  };
};

//component that displays the home page
const HomePage: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const [city, setCity] = useState(router.query.city || "nairobi");
  const [units, setUnits] = useState(router.query.units || "metric");

  const handleSearch = () => {
    router.push(`/?city=${city}&units=${units}`);
  };

  const handleUnitChange = (unit: string) => {
    setUnits(unit);
    router.push(`/?city=${city}&units=${unit}`);
  };

  if ("error" in data) {
    return (
      <div>
        <h3>{data.error}</h3>
      </div>
    );
  }

  const imageUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div className="bg-white min-h-screen font-sans p-6">
      <div className="flex min-h-[80vh]">
        <div className="w-1/4 pr-6 border-r border-black flex flex-col justify-between">
          <img src={imageUrl} alt="Weather Icon" className="w-full" />
          <h3 className="text-xl font-bold text-center mt-2">
            {data.main.temp}°C
          </h3>
          <h3 className="text-xl text-center mt-2 font-bold">
            {data.weather[0].description}
          </h3>
          <h3 className="text-xl text-center mt-40">{data.name}</h3>
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
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Weather in {data.name}
            </h1>
            <h2 className="text-lg text-gray-700 mb-4">
              {data.weather[0].main} — {data.weather[0].description}
            </h2>
            <p>🌡️ Feels like: {data.main.feels_like}°C</p>
            <p>💧 Humidity: {data.main.humidity}%</p>
            <p>💨 Wind Speed: {data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
