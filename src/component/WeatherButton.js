import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ city, cities, setCity }) => {
  return (
    <div>
      <Button
        variant={city === "" ? "warning" : "secondary"}
        onClick={() => setCity("")}
      >
        Current Location
      </Button>
      {cities.map((item, idx) => {
        return (
          <Button
            className="city-button"
            variant={city === item ? "warning" : "secondary"}
            key={idx}
            onClick={() => setCity(item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
