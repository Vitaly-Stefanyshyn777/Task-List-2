import { configureStore } from "@reduxjs/toolkit";
// import weatherReducer from "./slicers/weatherReducer";
// import registrationReducer from "@/store/slicers/registrationReducer";
// import themeReducer from "@/store/slicers/themeReducer";
import weatherReducer from "./slices/weatherReducer";
import themeReducer from "./slices/themeReducer";
import todoListsReducer from "./slices/todosSlice";

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
    // registration: registrationReducer,
    theme: themeReducer,
    todoLists: todoListsReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
