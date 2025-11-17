export default function CityList({ onCitySelect }) {
  const cities = ["New York", "London", "Tokyo", "Saint Louis"];

  return (
    <div className="city-list">
      <h2>Select a City</h2>
      <div className="cities">
        {cities.map((city) => (
          <button
            key={city}
            className="city-button"
            onClick={() => onCitySelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}