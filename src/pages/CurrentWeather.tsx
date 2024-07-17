import React from "react";
import CityGrid from "../components/CityGrid";
import Forecast from "../components/Forecast";

const CurrentWeather: React.FC = () => {
  return (
    <>
      <Forecast forecastType="current" />
      <CityGrid />
    </>
  );
};

export default CurrentWeather;
