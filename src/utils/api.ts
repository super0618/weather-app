const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const fetchCurrentWeather = async (city: string, unit: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};

export const fetchFiveDayForecast = async (city: string, unit: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};
