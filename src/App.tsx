import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import CurrentWeather from "./pages/CurrentWeather";
import FiveDayForecast from "./pages/FiveDayForecast";
import queryClient from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import useWeatherStore from "./store/weatherStore";

const lightTheme = {
  colors: {
    background: "#FFF",
    text: "#000",
    blue: "#0A84FF",
    yellow: "#FFD60A",
    purple: "#BF5AF2",
    cyan: "#64D2FF",
    // Add other colors as necessary
  },
};

const darkTheme = {
  colors: {
    background: "#000",
    text: "#FFF",
    blue: "#0A84FF",
    yellow: "#FFD60A",
    purple: "#BF5AF2",
    cyan: "#64D2FF",
    // Add other colors as necessary
  },
};

const Container = styled.div`
  height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
`;

const App: React.FC = () => {
  const theme = useWeatherStore((state) => state.theme);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Container>
          <GlobalStyles />
          <GlobalStyle />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<CurrentWeather />} />
              <Route path="/5days" element={<FiveDayForecast />} />
            </Routes>
          </Router>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
