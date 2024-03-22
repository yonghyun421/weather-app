import React from 'react';
import {Button} from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => {
    return (
        <div>
            <Button variant="warning" onClick={() => setCity('')}>Current Location</Button>
            {cities.map((city, idx) => {
                return <Button className="city-button" variant="warning" key={idx} onClick={() => setCity(city)}>{city}</Button>
            })}
        </div>
    );
};

export default WeatherButton;
