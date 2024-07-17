import React, { useState } from "react";
import styled from "styled-components";
import useWeatherStore from "../store/weatherStore";
import SettingsModal from "./SettingsModal";
import Clock from "./Clock";
import { ReactComponent as ThemeSwitchIcon } from "../assets/icons/theme-switch.svg";
import { ReactComponent as SearchCloseIcon } from "../assets/icons/close-circle.svg";

const ThemeSwitch = styled(ThemeSwitchIcon)`
  width: 1.5 rem;
  height: 1.5rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.text};
`;

const SearchClose = styled(SearchCloseIcon)`
  width: 1rem;
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.text};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  font-size: 1.2rem;
  border: 2px solid rgb(10, 132, 255);
  padding: 5px 28px 5px 5px;
  outline: none;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
`;

const FunctionGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FunctionTitle = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSearchInput, setIsSearchInput] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [time, setTime] = useState<Date>(new Date());
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);
  const setTheme = useWeatherStore((state) => state.setTheme);
  const theme = useWeatherStore((state) => state.theme);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedCity(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <HeaderContainer>
        <Clock time={time} setTime={setTime} />
        <FunctionGroup>
          {isSearchInput ? (
            <SearchContainer>
              <form onSubmit={handleSearch}>
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                />
              </form>
              <SearchClose style={{}} onClick={() => setIsSearchInput(false)} />
            </SearchContainer>
          ) : (
            <FunctionTitle onClick={() => setIsSearchInput(true)}>
              Search
            </FunctionTitle>
          )}
          <FunctionTitle onClick={() => setIsSettingsOpen(true)}>
            Setting
          </FunctionTitle>
          <ThemeSwitch
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          />
        </FunctionGroup>
        {isSettingsOpen && (
          <SettingsModal onClose={() => setIsSettingsOpen(false)} />
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
