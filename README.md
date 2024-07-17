Create a website that displays weather forecasts, matching the prototype provided as closely as possible.

1. Prototype

   Prototype images

2. API docs:

   Current
   One Call API 2.5

3. Fonts:

   Use Helvetica Neue or Helvetica as the font.
   If the above aren't available on your platform, use Roboto.

4. Colors:

   Black: #000
   White: #FFF
   Purple: #BF5AF2
   Yellow: #FFD60A
   Blue: #0A84FF
   Cyan: #64D2FF

5. Icons:

   Icons were provided as SVG files.
   weather-icons.zip

6. Requirements

   Use typescript
   Use the styled-components library for styling.
   Display a grid with any 18 cities.
   Any city that can be used to generate a valid weather forecast with the API provided can be used.
   When the app starts, shows a default message indicating that no city has been selected.
   Add the ability to click on a city from the grid, and see its current forecast.
   Allow the user to toggle between a 5-day weather forecast, where each day shows the high and low temperatures or the current weather for a city.
   Show an image for each weather condition using the asset icons provided.
   Add React Router to the project and add routes, such that / shows the current forecast, and /5days shows the 5 days forecast.
   Add a clock on the top left corner of the main page.
   Add a search button on the top right corner of the page; if the user types the name of a city and hits enter, select that city (even if the capitalization used is wrong).
   Add a settings button on the top right corner of the page; it should show a settings modal that allows the user to change in between imperial/metric/standard measurements and AM/PM or 24-hour time.
   Blur the view behind the modal.
   Add unit tests.

7. Extra Credit

   You're not required to implement these features, but successfully completing these will count as extra points on your evaluation:
   Use React Query & zustand
   Pull a random list of cities every time the user opens the app. These random cities must generate valid weather forecasts if picked
   Remove cells from the grid as the user types on the search bar. Even better if it's animated!
   Add a graphics library to add a graph of the temperature over the course of a week or day; insert a way to access the graph seamlessly in the page.
   Add animations.
   Add light/dark mode support.
