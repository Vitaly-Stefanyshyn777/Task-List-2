// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { fetchTodoLists } from "../app/slices/todosSlice";
// import TodoListForm from "../components/ToDoList/TodoListForm";
// import TodoListCard from "../components/ToDoList/TodoListCard";

// const Dashboard = () => {
//   const dispatch = useAppDispatch();
//   const { lists, loading, error } = useAppSelector((state) => state.todoLists);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [editingList, setEditingList] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTodoLists());
//   }, [dispatch, lists.length]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const handleEdit = (list: any) => {
//     setEditingList(list);
//     setShowCreateForm(true);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">📋 Your To-Do Lists</h1>

//       <button
//         onClick={() => {
//           setShowCreateForm((prev) => !prev);
//           setEditingList(null);
//         }}
//         className="bg-blue-500 text-white px-6 py-3 rounded mb-6 cursor-pointer"
//       >
//         {showCreateForm ? "Cancel" : "Add Todo List"}
//       </button>

//       {showCreateForm && <TodoListForm listToEdit={editingList} />}

//       <ul className="list-none p-0 grid gap-4">
//         {lists && lists.length > 0 ? (
//           lists.map((list) => (
//             <TodoListCard
//               key={list.id}
//               list={list}
//               onEdit={() => handleEdit(list)}
//             />
//           ))
//         ) : (
//           <p>No to-do lists found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFavorite, fetchWeather } from "../app/slices/weatherReducer";
import { AppDispatch, RootState } from "../app/store";

const POPULAR_CITIES = ["Kyiv", "New York", "London", "Tokyo"];

export default function Home() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.weather);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const favorites = useSelector((state: RootState) => state.weather.favorites);

  useEffect(() => {
    POPULAR_CITIES.forEach((city) => {
      dispatch(fetchWeather(city));
    });
  }, [dispatch]);

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city.trim()));
      setSearchedCity(city.trim()); // зберігаємо останнє місто
      setCity("");
    }
  };

  const handleAddFavorite = (cityName: string) => {
    if (cityName && !favorites.includes(cityName)) {
      dispatch(addFavorite(cityName));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Погода 🌤️</h1>

      {/* Пошук міста */}
      <div className="mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть назву міста"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="w-full mt-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Пошук
        </button>
      </div>

      {/* Стан завантаження */}
      {loading && <p className="text-gray-500">Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Показати інформацію про останнє знайдене місто */}
      {weather && searchedCity && weather[searchedCity] && (
        <div className="p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold">{weather[searchedCity]?.name}</h2>
          <p>
            Температура: {weather[searchedCity]?.main?.temp ?? "Немає даних"}°C
          </p>
          <p>
            Опис:{" "}
            {weather[searchedCity]?.weather?.[0]?.description || "Немає даних"}
          </p>
          <button
            onClick={() => handleAddFavorite(weather[searchedCity]?.name)}
            className="mt-2 p-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            Додати до обраного
          </button>
        </div>
      )}

      {/* Всі завантажені міста */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Усі міста</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(weather).map((cityWeather: any) => (
          <div
            key={cityWeather.name}
            className="p-4 border rounded bg-gray-100 hover:shadow transition"
          >
            <h3 className="font-semibold">{cityWeather.name}</h3>
            <p>🌡️ {cityWeather.main.temp}°C</p>
            <p>📝 {cityWeather.weather[0]?.description}</p>
            <button
              onClick={() => handleAddFavorite(cityWeather.name)}
              className="mt-2 block w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Додати до обраного
            </button>
          </div>
        ))}
      </div>

      {/* Кнопка переходу до обраного */}
      <div className="mt-8 text-center">
        <NavLink
          to="/favorites"
          className="inline-block p-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
        >
          Перейти до обраного
        </NavLink>
      </div>
    </div>
  );
}
