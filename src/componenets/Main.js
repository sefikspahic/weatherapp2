import React, { useState, useEffect } from "react";
import Header from "./Header";
import SingleResult from "./SingleResult";
import axios from "axios";

const KEY = process.env.REACT_APP_KEY;
const Main = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [tempCity, setTempCity] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(false);

  const sendRequest = () => {
    const URL = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&type=accurate&appid=${KEY}`;

    axios
      .get(URL)
      .then((response) => {
        let tempTemperature = response.data.list[0].main.temp;
        let tempCity = response.data.list[0].name;
        let tempCoutry = response.data.list[0].sys.country.toLowerCase();
        let tempWindSpeed = response.data.list[0].wind.speed;
        let tempWindDeg = response.data.list[0].wind.deg;
        let tempIcon = response.data.list[0].weather[0].icon;

        let winDeg = "";

        if (tempWindDeg >= 0 && tempWindDeg < 45) {
          winDeg = "↑";
        } else if (tempWindDeg >= 45 && tempWindDeg < 90) {
          winDeg = "↗️";
        } else if (tempWindDeg >= 90 && tempWindDeg < 135) {
          winDeg = "→";
        } else if (tempWindDeg >= 135 && tempWindDeg < 180) {
          winDeg = "↘️";
        } else if (tempWindDeg >= 180 && tempWindDeg < 225) {
          winDeg = "↓";
        } else if (tempWindDeg >= 225 && tempWindDeg < 270) {
          winDeg = "↙️";
        } else if (tempWindDeg >= 270 && tempWindDeg < 315) {
          winDeg = "←";
        } else if (tempWindDeg >= 315 && tempWindDeg < 360) {
          winDeg = "↖️";
        } else if (tempWindDeg === 360) {
          winDeg = "↑";
        }

        let tempData = {
          city: tempCity,
          icon: tempIcon,
          country: tempCoutry,
          temp: tempTemperature,
          windSpeed: tempWindSpeed,
          arrow: winDeg,
        };

        setData([...data, tempData]);
      })
      .catch((reason) => console.log(reason));
  };

  useEffect(() => {
    if (city === "") return;

    sendRequest();
  }, [city]);

  const clickHandler = () => {
    setIsInput(!isInput);
    setIsDisableButton(true);
  };

  const changeHandler = (e) => {
    setTempCity(e.target.value);
    setIsDisableButton(true);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      if (tempCity !== "") {
        setCity(tempCity);
        setIsInput(false);
      }
    }
    setIsDisableButton(false);
  };
  const removeInput = () => {
    window.location.reload();
  };
  const removeHandler = (index) => {
    let newData = [];
    let j = 0;

    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        newData[j] = data[i];
        j++;
      }
    }

    setData(newData);
  };

  useEffect(() => {
    if (data.length === 0) return;

    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (localStorage.getItem("data") === null) return;

    if (JSON.parse(localStorage.getItem("data")) === null) return;

    setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <div>
      <Header />
      <div className="weather-container">
        <div className="add-button-container">
          <button
            className="add-box-btn"
            disabled={isDisableButton}
            onClick={clickHandler}
          >
            +
          </button>
        </div>

        {isInput ? (
          <div className="weather-box">
            <div className="content">
              <div className="form-control">
                <input
                  onChange={changeHandler}
                  onKeyPress={enterHandler}
                  type="text"
                  placeholder="Enter city..."
                />
              </div>
              <button onClick={removeInput}>REMOVE</button>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="weather-list">
          {data.map((value, index) => {
            return (
              <SingleResult
                key={index}
                city={value.city}
                icon={value.icon}
                country={value.country}
                temp={value.temp}
                windSpeed={value.windSpeed}
                arrow={value.arrow}
                index={index}
                removeHandler={removeHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Main;
