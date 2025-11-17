import { useEffect, useRef, useState } from "react";
import { weatherData } from "./weatherData";

export default function CityForecast({ selectedCity, onBack }) {
  const detailsRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadMessage, setLoadMessage] = useState("");

  // Simulate API call with delay when city changes
  useEffect(() => {
    if (!selectedCity) return;

    setLoading(true);
    setLoadMessage("Loading weather data for " + selectedCity + "...");

    const timer = setTimeout(() => {
      setLoading(false);
      setLoadMessage("Weather data loaded successfully!");
      
      // Optional: Clear success message after 2 seconds
      setTimeout(() => setLoadMessage(""), 2000);
    }, 800); // Simulated network delay

    // Cleanup timer if city changes before timeout
    return () => clearTimeout(timer);
  }, [selectedCity]);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedCity) return null;

  const data = weatherData[selectedCity];

  // Invalid city fallback
  if (!data) {
    return (
      <div className="forecast">
        <h2>City Not Found</h2>
        <p>Sorry, weather data is not available for "{selectedCity}"</p>
        <button onClick={onBack} className="back-btn">
          Back to Cities
        </button>
      </div>
    );
  }

  return (
    <div className="forecast">
      <h2>{data.icon} Weather in {data.city}</h2>

      {/* Loading / Status Messages */}
      {loading && (
        <div className="status loading">
          {loadMessage}
        </div>
      )}
      {loadMessage && !loading && (
        <div className="status success">
          {loadMessage}
        </div>
      )}

      {/* Show forecast only when not loading */}
      {!loading && (
        <>
          <p className="summary">{data.summary}</p>

          <button onClick={scrollToDetails} className="details-btn">
            View Details
          </button>

          <div ref={detailsRef} className="details-section">
            <h3>Detailed Forecast</h3>
            <p>{data.details}</p>
          </div>
        </>
      )}

      <button onClick={onBack} className="back-btn">
        Back to City List
      </button>
    </div>
  );
}