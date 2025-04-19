<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/', function () {
    return ("Hello Adnan");
});

Route::get('/weather/{city}/{units}', [WeatherController::class, 'getCurrentWeather']);
Route::get('/forecast/{city}/{units}', [WeatherController::class, 'getForecast']);