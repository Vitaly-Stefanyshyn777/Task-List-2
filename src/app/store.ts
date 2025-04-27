import { configureStore } from "@reduxjs/toolkit";
// import weatherReducer from "./slices/weatherReducer";
import themeReducer from "@/features/theme/themeSlice";
import eventsReducer from "@/features/events/eventSlice";
import weatherReducer from "@/features/weather/weatherSlice";
import authReducer from "@/features/auth/authSlice";

const preloadedState = {
  theme: {
    theme:
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      "light",
  },
};
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer,
    theme: themeReducer,
    events: eventsReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
