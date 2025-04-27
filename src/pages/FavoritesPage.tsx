import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchWeather,
  removeFavorite,
  setFavorites,
} from "@/features/weather/weatherSlice";
import FavoritesList from "@/features/weather/components/FavoritesList";

const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.weather.favorites);
  const weatherData = useAppSelector((state) => state.weather.weather);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      dispatch(setFavorites(JSON.parse(saved)));
    }
  }, [dispatch]);

  useEffect(() => {
    favorites.forEach((city) => {
      if (!weatherData[city]) {
        dispatch(fetchWeather(city));
      }
    });
  }, [favorites, dispatch, weatherData]);

  const handleRemoveFavorite = (city: string) => {
    dispatch(removeFavorite(city));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Обрані міста</h1>
      <FavoritesList
        favoritesData={weatherData}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
};

export default FavoritesPage;
