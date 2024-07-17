import React, { useState } from "react";
import styled from "styled-components";
import useWeatherStore from "../store/weatherStore";
import Clock from "./Clock";
import SettingButton from "./SettingButton";

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: ${(props) => props.theme.colors.background};
  border: 2px solid rgb(10, 132, 255);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Overlay = styled.div`
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  transition: opacity 0.2s linear 0s;
  z-index: 1;
`;

const ModalTitle = styled.span`
  text-align: center;
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text};
`;

const SettingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
`;

const SettingTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
`;

const SettingGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

interface SettingsModdalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModdalProps> = ({ onClose }) => {
  const [time, setTime] = useState<Date>(new Date());
  const setUnit = useWeatherStore((state) => state.setUnit);
  const unit = useWeatherStore((state) => state.unit);
  const setTimeFormat = useWeatherStore((state) => state.setTimeFormat);
  const timeFormat = useWeatherStore((state) => state.timeFormat);
  const [currentUnit, setCurrentUnit] = useState<
    "imperial" | "metric" | "standard"
  >(unit);
  const [currentTimeFormat, setCurrentTimeFormat] = useState<
    "12-hour" | "24-hour"
  >(timeFormat);

  const handleSave = () => {
    setUnit(currentUnit);
    setTimeFormat(currentTimeFormat);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <ModalTitle>Settings</ModalTitle>
        <SettingContainer>
          <SettingTitle>Units</SettingTitle>
          <SettingGroup>
            <SettingButton
              name="Imperial"
              onClick={() => setCurrentUnit("imperial")}
              isActive={currentUnit === "imperial"}
              style={{}}
            />
            <SettingButton
              name="Metric"
              onClick={() => setCurrentUnit("metric")}
              isActive={currentUnit === "metric"}
            />
            <SettingButton
              name="Standard"
              onClick={() => setCurrentUnit("standard")}
              isActive={currentUnit === "standard"}
            />
          </SettingGroup>
        </SettingContainer>
        <SettingContainer>
          <SettingTitle>Times</SettingTitle>
          <SettingGroup>
            <SettingButton
              name="AM/PM"
              onClick={() => setCurrentTimeFormat("12-hour")}
              isActive={currentTimeFormat === "12-hour"}
            />
            <SettingButton
              name="24h"
              onClick={() => setCurrentTimeFormat("24-hour")}
              isActive={currentTimeFormat === "24-hour"}
            />
          </SettingGroup>
        </SettingContainer>
        <SettingGroup>
          <SettingButton name="Cancel" onClick={onClose} isActive={false} />
          <SettingButton name="Save" onClick={handleSave} isActive={false} />
        </SettingGroup>
        <Clock time={time} setTime={setTime} />
      </Modal>
    </Overlay>
  );
};

export default SettingsModal;
