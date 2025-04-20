export type WeatherData = {
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    name: string;
};

export type ErrorData = {
    error: string;
};

export type Forecast = {
    [date: string]: {
        average_temp: number;
        icon: string;
    };
};