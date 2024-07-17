import React from "react";
import CityGrid from "../components/CityGrid";
import Forecast from "../components/Forecast";

const FiveDayForecast: React.FC = () => {
  return (
    <>
      <Forecast forecastType="5days" />
      <CityGrid />
    </>
  );
};

export default FiveDayForecast;
