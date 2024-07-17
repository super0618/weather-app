import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCurrentWeather, useFiveDayForecast } from "../hooks/useWeather";
import useWeatherStore from "../store/weatherStore";
import SettingButton from "./SettingButton";
import WeatherIcon from "./WeatherIcon";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";

const EmptyContainer = styled.span`
  font-size: 2.5rem;
  display: flex;
  text-align: center;
  align-item: center;
`;

const ForecastContainer = styled.div`
  min-height: 25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const CurrentWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  gap: 1rem;
  position: relative;
`;

const WeatherTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
`;

const SettingContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CurrentFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const CurrentDetail = styled.div`
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  margin: auto;
  width: fit-content;
  height: fit-content;
  left: 25rem;
  display: grid;
  gap: 0.5rem;
`;

const DetailInfo = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
`;

const ForecastDataContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 0.5rem;
`;

interface ForecastProps {
  forecastType: "current" | "5days";
}

const Forecast: React.FC<ForecastProps> = ({ forecastType }) => {
  const navigate = useNavigate();
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const unit = useWeatherStore((state) => state.unit);
  const [tempUnit, setTempUnit] = useState<"°C" | "°F" | "K">("°C");
  const [forecastList, setForecastList] = useState<Array<any>>();

  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    switch (unit) {
      case "imperial":
        setTempUnit("K");
        break;
      case "metric":
        setTempUnit("°C");
        break;
      case "standard":
        setTempUnit("K");
        break;
      default:
        break;
    }
  }, [unit]);

  const { data: currentWeather } = useCurrentWeather(selectedCity || "");
  const { data: fiveDayForecast } = useFiveDayForecast(selectedCity || "");

  useEffect(() => {
    if (fiveDayForecast) {
      const data = fiveDayForecast.list;
      const groupedData = data.reduce((acc: any, item: any) => {
        const itemDate = new Date(item.dt * 1000);
        const formattedDate = formatDate(itemDate);

        if (!acc[formattedDate]) acc[formattedDate] = [];

        acc[formattedDate].push(item);
        return acc;
      }, {});

      const doubleArray = Object.entries(groupedData).map(
        ([date, entries]) => entries
      );
      setForecastList(doubleArray.slice(1));
    }
  }, [fiveDayForecast]);

  if (!selectedCity)
    return (
      <ForecastContainer>
        <EmptyContainer>Pick a city to see the full forecast</EmptyContainer>
      </ForecastContainer>
    );

  return (
    <ForecastContainer>
      {forecastType === "current" && currentWeather && (
        <>
          <CurrentWeatherContainer>
            <WeatherTitle>{currentWeather.name}</WeatherTitle>
            <WeatherIcon weather={currentWeather.weather[0].main} />
            <WeatherTitle>{currentWeather.weather[0].main}</WeatherTitle>
            <CurrentDetail>
              <DetailInfo>
                Temp: {currentWeather.main.temp}
                {tempUnit}
              </DetailInfo>
              <DetailInfo>
                Feels Like: {currentWeather.main.feels_like}
                {tempUnit}
              </DetailInfo>
              <DetailInfo>Humidity: {currentWeather.main.humidity}%</DetailInfo>
              <DetailInfo>
                Sunrise:&nbsp;
                <Clock
                  time={
                    new Date(
                      currentWeather.sys.sunrise * 1000 +
                        currentWeather.timezone * 1000
                    )
                  }
                  setTime={() => {}}
                  dateType="UTC"
                />
              </DetailInfo>
              <DetailInfo>
                Sunset:&nbsp;
                <Clock
                  time={
                    new Date(
                      currentWeather.sys.sunset * 1000 +
                        currentWeather.timezone * 1000
                    )
                  }
                  setTime={() => {}}
                  dateType="UTC"
                />
              </DetailInfo>
            </CurrentDetail>
          </CurrentWeatherContainer>
          <CurrentFooter>
            <WeatherTitle>Forecast</WeatherTitle>
            <SettingContainer>
              <SettingButton
                name="Now"
                isActive={window.location.pathname === "/"}
                onClick={() => navigate("/")}
              />
              <SettingButton
                name="5 Days"
                isActive={window.location.pathname === "/5days"}
                onClick={() => navigate("/5days")}
              />
            </SettingContainer>
          </CurrentFooter>
        </>
      )}
      {forecastType === "5days" && fiveDayForecast && (
        <>
          <WeatherTitle>{fiveDayForecast.city.name}</WeatherTitle>
          <ForecastDataContainer>
            {forecastList?.map(
              (forecasts: any, index: number) => (
                // forecasts?.map((forecast: any, index1: number) => {
                <ForecastItem key={index}>
                  <DetailInfo>
                    {new Date(forecasts[0].dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                      timeZone: "UTC",
                    })}
                  </DetailInfo>
                  <WeatherIcon weather={forecasts[0].weather[0].main} />
                  <DetailInfo>{forecasts[0].weather[0].main}</DetailInfo>
                  <DetailInfo>
                    H:&nbsp;
                    {forecasts.reduce(
                      (min: any, curr: any) =>
                        Math.min(min, curr.main.temp_min),
                      Infinity
                    )}
                    {tempUnit} / L:&nbsp;
                    {forecasts.reduce(
                      (max: any, curr: any) =>
                        Math.max(max, curr.main.temp_max),
                      -Infinity
                    )}
                    {tempUnit}
                  </DetailInfo>
                </ForecastItem>
              )
              // })
            )}
          </ForecastDataContainer>
          <CurrentFooter>
            <SettingContainer>
              <SettingButton
                name="Now"
                isActive={window.location.pathname === "/"}
                onClick={() => navigate("/")}
              />
              <SettingButton
                name="5 Days"
                isActive={window.location.pathname === "/5days"}
                onClick={() => navigate("/5days")}
              />
            </SettingContainer>
          </CurrentFooter>
        </>
      )}
    </ForecastContainer>
  );
};

export default Forecast;
