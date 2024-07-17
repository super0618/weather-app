import React from "react";
import styled from "styled-components";
import useWeatherStore from "../store/weatherStore";
import SettingButton from "./SettingButton";

const Grid = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0px auto;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const cities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Berlin",
  "Moscow",
  "Beijing",
  "Sydney",
  "Rome",
  "Madrid",
  "Toronto",
  "Dubai",
  "Mumbai",
  "Los Angeles",
  "Buenos Aires",
  "Cairo",
  "Istanbul",
  "Seoul",
];

const CityGrid: React.FC = () => {
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);
  const selectedCity = useWeatherStore((state) => state.selectedCity);

  return (
    <Grid>
      {cities.map((city, index) => (
        <SettingButton
          key={index}
          name={city}
          isActive={city === selectedCity}
          onClick={() => setSelectedCity(city)}
          style={{ height: "4rem", fontSize: "1.5rem" }}
        />
      ))}
    </Grid>
  );
};

export default CityGrid;
