// Тип для окремого об'єкта погоди, який приходить з API
export interface WeatherData {
  name: string; // Назва міста
  main: {
    temp: number; // Температура в градусах
  };
  weather: {
    description: string; // Опис погоди (наприклад, "сонячно")
    icon: string; // Код іконки для відображення
  }[];
}

// Тип для стану (state) зберігання погоди у Redux
export interface WeatherState {
  loading: boolean; // Чи йде завантаження
  weather: Record<string, WeatherData>; // Сховище погод для міст { 'Kyiv': WeatherData, 'London': WeatherData }
  error: string | null; // Помилка запиту
  favorites: string[]; // Список улюблених міст
}
