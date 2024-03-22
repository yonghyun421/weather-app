import './App.css';
import {useEffect, useState} from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClipLoader} from "react-spinners";

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨 보여주기
// 2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태 정보가 들어간다.
// 3. 5개의 버튼이 있다. (1개는 현재위치 4개는 다른 도시)
// 4. 버튼을 누르면 해당 도시의 날씨 정보가 보인다.
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Seoul", "Paris", "New York", "Tokyo"];
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //
  //   getCurrentLocation();
  //   getWeatherByCity(city);
  // }, []);

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    }else {
      getWeatherByCity(city);
    }
  }, [city]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32e35cf8d2f27f04f02af9af8c77e52c&units=metric`;
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32e35cf8d2f27f04f02af9af8c77e52c&units=metric`;
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  return (
    <div>
      {loading
          ?
          <div className={"container"}>
            <ClipLoader
            color={'#f88c6b'}
            loading={loading}
            size={150}
            />
          </div>
          :
          <div className={"container"}>
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} setCity={setCity}/>
          </div>
      }

    </div>
  );
}

export default App;
