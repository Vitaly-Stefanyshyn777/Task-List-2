import React from "react";
import { WeatherData } from "../types";
import WeatherCard from "./WeatherCard";

interface FavoritesListProps {
  favoritesData: Record<string, WeatherData>;
  onRemove: (city: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favoritesData,
  onRemove,
}) => {
  const favoriteCities = Object.keys(favoritesData);

  if (favoriteCities.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>У вас поки немає улюблених міст.</p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {favoriteCities.map((city) => {
        const weather = favoritesData[city];
        return (
          <div key={city} style={{ position: "relative" }}>
            <button
              onClick={() => onRemove(city)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              aria-label={`Видалити ${city} з обраного`}
            >
              ×
            </button>
            <WeatherCard weatherData={weather} />
          </div>
        );
      })}
    </div>
  );
};

export default FavoritesList;
