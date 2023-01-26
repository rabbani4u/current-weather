import React, { useEffect, useState } from "react";
import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";
import Description from "./Components/Description";
import Footer from "./Components/Footer/Footer";
import { getFormatedWeatherData } from "./WeatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fethWeatherData = async () => {
      const data = await getFormatedWeatherData(city, unit);
      setWeather(data);

      //dynamic bg
      const threshold = unit === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    fethWeatherData();
  }, [unit, city]);

  const handleUnitClick = e => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnit(isCelcius ? "metric" : "imperial");
    console.log(currentUnit);
  };
  const enterKeyPress = e => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="app" style={bgStyle}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPress}
                type="text"
                name="city"
                placeholder="Enter City"
              />
              <button onClick={e => handleUnitClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="WeatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${
                  unit === "metric" ? "C" : "F"
                }`}</h1>
                {/* 31°C */}
              </div>
            </div>
            {/* bottom description */}
            <Description weather={weather} unit={unit} />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
