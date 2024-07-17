import React, { useEffect } from "react";
import styled from "styled-components";
import useWeatherStore from "../store/weatherStore";

const CurrentTime = styled.div`
  font-size: 1.5rem;
`;

interface ClockProps {
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
  dateType?: "UTC";
  [key: string]: any;
}

const Clock: React.FC<ClockProps> = ({ time, setTime, dateType, ...props }) => {
  const timeFormat = useWeatherStore((state) => state.timeFormat);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, [setTime]);

  const formatTime = (date: Date) => {
    if (timeFormat === "12-hour") {
      return dateType === "UTC"
        ? date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
    }
    return dateType === "UTC"
      ? date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        })
      : date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  return <CurrentTime {...props}>{formatTime(time)}</CurrentTime>;
};

export default Clock;
