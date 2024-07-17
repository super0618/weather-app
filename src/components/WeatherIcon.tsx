import React from "react";
import styled from "styled-components";
import { ReactComponent as Clear } from "../assets/icons/weather-clear.svg";
import { ReactComponent as Cloudy } from "../assets/icons/weather-cloudy.svg";
import { ReactComponent as Fog } from "../assets/icons/weather-fog.svg";
import { ReactComponent as Hail } from "../assets/icons/weather-hail.svg";
import { ReactComponent as Lightning } from "../assets/icons/weather-lightning.svg";
import { ReactComponent as Pouring } from "../assets/icons/weather-pouring.svg";
import { ReactComponent as Snowy } from "../assets/icons/weather-snowy.svg";

const weatherIconMap: {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  Clear,
  Clouds: Cloudy,
  Fog,
  Hail,
  Lightning,
  Pouring,
  Snow: Snowy,
  Mist: Fog,
  Smoke: Fog,
  Haze: Fog,
  Dust: Fog,
  Sand: Fog,
  Ash: Fog,
  Squall: Fog,
  Tornado: Fog,
  Thunderstorm: Lightning,
  Drizzle: Hail,
  Rain: Pouring,
};

const StyledIcon = styled.div<{
  weather: string;
}>`
  width: 8rem;
  height: 8rem;
  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) =>
      props.weather === "Clear"
        ? props.theme.colors.yellow
        : props.theme.colors.blue};
  }
`;

interface WeatherIconProps {
  weather: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather }) => {
  const IconComponent = weatherIconMap[weather];

  if (!IconComponent) return <></>;

  return (
    <StyledIcon weather={weather}>
      <IconComponent />
    </StyledIcon>
  );
};

export default WeatherIcon;
