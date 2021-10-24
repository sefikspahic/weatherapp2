import React, { useState, useEffect } from "react";

export default function SingleResult({ setCity, boxNumber, setBoxes, boxes }) {
  const [isInput, setIsInput] = useState(true);
  const [tempCity, setTempCity] = useState("");

  const changeHandler = (e) => {
    setTempCity(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      if (tempCity !== "") {
        setCity(tempCity);
      }
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();

    let tempBoxes = boxes.filter((value, index) => {
      if (index !== boxNumber) {
        console.log(index);
        return value;
      }
    });

    setBoxes(tempBoxes);
  };

  return (
    <div className="single">
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
      <button onClick={clickHandler}>Remove</button>
      {boxNumber}
    </div>
  );
}
