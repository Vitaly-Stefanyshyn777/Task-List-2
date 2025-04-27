import React from "react";
import { WeatherData } from "../types";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "20px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <h2>{name}</h2>

      {weather[0] && (
        <div style={{ margin: "10px 0" }}>
          <img
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            style={{ width: 100, height: 100 }}
          />
          <p style={{ fontSize: "18px", margin: "5px 0" }}>
            {weather[0].description}
          </p>
        </div>
      )}

      <h3>{main.temp}°C</h3>
    </div>
  );
};

export default WeatherCard;
