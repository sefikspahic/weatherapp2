import React, { useState, useEffect } from "react";
import Header from "./Header";
import SingleResult from "./SingleResult";

const KEY = process.env.REACT_APP_KEY;
export default function Main() {
  const [data, setData] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [id, setId] = useState(0);
  const [city, setCity] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [tempCity, setTempCity] = useState("");

  useEffect(() => {
    console.log(city);
  }, [city]);

  const clickHandler = (e) => {
    setIsInput(!isInput);
  };

  const changeHandler = (e) => {
    setTempCity(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      if (tempCity !== "") {
        setCity(tempCity);
        setIsInput(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <button onClick={clickHandler}>+</button>
      {isInput ? (
        <input
          onChange={changeHandler}
          onKeyPress={enterHandler}
          type="text"
          placeholder="enter city..."
        />
      ) : (
        <div></div>
      )}
      <div className="container">
        {boxes.map((value, index) => {
          return (
            <SingleResult
              key={index}
              setCity={setCity}
              boxNumber={index}
              setBoxes={setBoxes}
              boxes={boxes}
            />
          );
        })}
      </div>
    </div>
  );
}
