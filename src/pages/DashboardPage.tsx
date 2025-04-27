import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchWeather, addFavorite } from "@/features/weather/weatherSlice";
import WeatherCard from "@/features/weather/components/WeatherCard";
import SearchBar from "@/features/weather/components/SearchBar";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weather);
  const loading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.error);

  const handleSearch = (city: string) => {
    dispatch(fetchWeather(city));
  };

  const handleAddFavorite = (city: string) => {
    dispatch(addFavorite(city));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Погода</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Object.values(weatherData).map((data) => (
        <div key={data.name} style={{ marginBottom: "20px" }}>
          <WeatherCard weatherData={data} />
          <button onClick={() => handleAddFavorite(data.name)}>
            Додати в обране
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
