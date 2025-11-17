import { useEffect, useRef } from "react";
import { weatherData } from "./weatherData";


export default function CityForecast({ selectedCity, onBack }) {
  const detailsRef = useRef(null);

  // Simulate fetching weather when city changes
  useEffect(() => {
    if (selectedCity && weatherData[selectedCity]) {
      console.log(`Fetching weather for ${selectedCity}...`);
      // Simulated API delay
      const timer = setTimeout(() => {
        console.log("Weather data loaded!");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [selectedCity]);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedCity) return null;

  const data = weatherData[selectedCity];

  if (!data) {
    return (
      <div className="forecast">
        <p>City not found!</p>
        <button onClick={onBack}>← Back to Cities</button>
      </div>
    );
  }

  return (
    <div className="forecast">
      <h2>
        {data.icon} Weather in {data.city}
      </h2>
      <p className="summary">{data.summary}</p>

      <button onClick={scrollToDetails} className="details-btn">
        View Details
      </button>

      <div ref={detailsRef} className="details-section">
        <h3>Detailed Forecast</h3>
        <p>{data.details}</p>
      </div>

      <button onClick={onBack} className="back-btn">
        ← Back to City List
      </button>
    </div>
  );
}