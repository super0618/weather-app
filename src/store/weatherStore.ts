import create from "zustand";

interface WeatherState {
  selectedCity: string | null;
  unit: "metric" | "imperial" | "standard";
  timeFormat: "12-hour" | "24-hour";
  theme: "light" | "dark";
  setSelectedCity: (city: string | null) => void;
  setUnit: (unit: "metric" | "imperial" | "standard") => void;
  setTimeFormat: (format: "12-hour" | "24-hour") => void;
  setTheme: (theme: "light" | "dark") => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  selectedCity: null,
  unit: "metric",
  timeFormat: "24-hour",
  theme: "light",
  setSelectedCity: (city) => set(() => ({ selectedCity: city })),
  setUnit: (unit) => set(() => ({ unit })),
  setTimeFormat: (format) => set(() => ({ timeFormat: format })),
  setTheme: (theme) => set(() => ({ theme })),
}));

export default useWeatherStore;
