import { useState } from "react";
import CityList from "./CityList";
import CityForecast from "./CityForecast";
import "./App.css";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="App">
      <header>
        <h1>Weather Forecast App</h1>
      </header>

      <main>
        {!selectedCity ? (
          <CityList onCitySelect={setSelectedCity} />
        ) : (
          <CityForecast
            selectedCity={selectedCity}
            onBack={() => setSelectedCity(null)}
          />
        )}
      </main>
    </div>
  );
}