import React from "react";
import styled from "styled-components";

const DeactiveButton = styled.button`
  min-width: 8rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 2px solid rgb(10, 132, 255);
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const ActiveButton = styled.button`
  min-width: 8rem;
  background: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.blue};
  border: 2px solid rgb(10, 132, 255);
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
`;

interface SettingButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  [key: string]: any;
}

const SettingButton: React.FC<SettingButtonProps> = ({
  name,
  isActive,
  onClick,
  ...props
}) => {
  return isActive ? (
    <ActiveButton {...props} onClick={onClick}>
      {name}
    </ActiveButton>
  ) : (
    <DeactiveButton {...props} onClick={onClick}>
      {name}
    </DeactiveButton>
  );
};
export default SettingButton;
