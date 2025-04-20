type WeatherData = {
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

type ErrorData = {
    error: string;
};

export type Props = {
    data: WeatherData | ErrorData;
};
