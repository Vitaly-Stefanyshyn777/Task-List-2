import axios from "axios";
import { WeatherData } from "./types";

// const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_KEY = "8883bae4b75acf1de4051d0916bd9cc1";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

if (!API_KEY) {
  throw new Error("API ключ не знайдено! Перевір файл .env");
}

// Функція отримання погоди по місту
export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // Градуси Цельсія
      },
    });

    const { name, main, weather } = response.data;

    return {
      name,
      main: {
        temp: main.temp,
      },
      weather: weather.map((w: any) => ({
        description: w.description,
        icon: w.icon,
      })),
    };
  } catch (error: any) {
    console.error("Помилка при запиті погоди:", error);
    throw new Error(
      error.response?.data?.message || "Помилка при отриманні погоди"
    );
  }
};
