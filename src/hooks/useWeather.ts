import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather, fetchFiveDayForecast } from "../utils/api";
import useWeatherStore from "../store/weatherStore";

// Hook to get current weather data
export const useCurrentWeather = (city: string) => {
  const unit = useWeatherStore((state) => state.unit);
  return useQuery({
    queryKey: ["currentWeather", city, unit],
    queryFn: () => fetchCurrentWeather(city, unit),
    enabled: !!city,
  });
};

// Hook to get 5-day weather forecast data
export const useFiveDayForecast = (city: string) => {
  const unit = useWeatherStore((state) => state.unit);
  return useQuery({
    queryKey: ["fiveDayForecast", city, unit],
    queryFn: () => fetchFiveDayForecast(city, unit),
    enabled: !!city,
  });
};
