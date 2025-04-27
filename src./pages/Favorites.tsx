import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const weather = useSelector((state: RootState) => state.weather.weather);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Обрані міста 🌟</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">Немає доданих обраних міст.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((cityName) => {
            const cityWeather = weather[cityName];
            if (!cityWeather) return null;
            return (
              <div
                key={cityWeather.name}
                className="p-4 border rounded bg-gray-100 hover:shadow transition"
              >
                <h3 className="font-semibold">{cityWeather.name}</h3>
                <p>🌡️ {cityWeather.main.temp}°C</p>
                <p>📝 {cityWeather.weather[0]?.description}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <NavLink
          to="/dashboard"
          className="inline-block p-3 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
        >
          Назад на головну
        </NavLink>
      </div>
    </div>
  );
};

export default Favorites;
