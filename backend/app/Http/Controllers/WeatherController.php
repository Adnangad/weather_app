<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

// class that handles weather
class WeatherController extends Controller
{
    //gets the longitude and latitude of a city using geolocation api
    public function geolocation($city)
    {
        $api_key = env("OPENWEATHER_API_KEY");
        $response = Http::get("http://api.openweathermap.org/geo/1.0/direct", [
            'q' => $city,
            'appid' => $api_key,
        ]);
        if ($response->successful()) {
            $data = $response->json();
            if (!empty($data)) {
                $lon = $data[0]['lon'];
                $lat = $data[0]['lat'];

                return [
                    'lon' => $lon,
                    'lat' => $lat,
                ];
            } else {
                return response()->json(['error' => 'No geolocation data found'], 404);
            }
        } else {
            return response()->json(['error' => 'Could not fetch geolocation data'], $response->status());
        }
    }

    // gets the weather details of a city
    public function getCurrentWeather($city, $units)
    {
        $api_key = env("OPENWEATHER_API_KEY");
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $api_key,
            'units' => $units,
        ]);
        if ($response->successful()) {
            $data = $response->json();
            return ($data);
        } else {
            return response()->json(['error' => 'Could not fetch weather data'], $response->status());
        }
    }

    //Retreives The forecast of 3 days
    public function getForecast($city, $units)
    {
        $api_key = env("OPENWEATHER_API_KEY");
        $location = $this->geolocation($city); // ive called geolocation to retreive long and lat
        if (isset($location['error'])) {
            return $location;
        }

        $lat = $location['lat'];
        $lon = $location['lon'];
        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $api_key,
            'units' => $units,
        ]);
        if ($response->successful()) {
            $data = $response->json();
            $list = $data['list'];

            //used to group the data day by day
            $dailyData = [];

            foreach ($list as $entry) {
                $date = substr($entry['dt_txt'], 0, 10);
                $temp = $entry['main']['temp'];
                $icon = $entry['weather'][0]['icon'];

                $dailyData[$date]['temps'][] = $temp;
                $dailyData[$date]['icons'][] = $icon;
            }
            $forecast = [];
            $count = 0;
            $today = date('Y-m-d');

            // retreives the average forecast  for 3 days
            foreach($dailyData as $date => $data) {
                // if its the current date, skip it
                if ($date === $today) {
                    continue;
                }
                if ($count >= 3) break;

                //gets the avg temp
                $avgTemp = array_sum($data['temps']) / count($data['temps']);

                //gets the most frequent icon
                $iconCounts = array_count_values($data['icons']);
                arsort($iconCounts);
                $mostFrequentIcon = array_key_first($iconCounts);

                $forecast[$date] = [
                    'average_temp' => round($avgTemp, 2),
                    'icon' => $mostFrequentIcon,
                ];
                $count++;
            }

            return $forecast;
        } else {
            return response()->json(['error' => 'Could not fetch forecast data'], $response->status());
        }
    }
}