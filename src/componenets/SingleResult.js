import React from "react";

const SingleResult = ({
  city,
  icon,
  country,
  temp,
  windSpeed,
  arrow,
  index,
  removeHandler,
}) => {
  return (
    <div className="weather-box">
      <div className="content">
        <p className="inputedit">
          <p>{city}</p>
          <p>
            <img
              src={`https://flagicons.lipis.dev/flags/1x1/${country}.svg`}
              alt="Country Icon"
            />
          </p>
        </p>

        <div>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Weather Icon"
            />
            {temp}°C {windSpeed}m/s {arrow}
          </p>
        </div>
        <button onClick={() => removeHandler(index)}>Remove</button>
      </div>
    </div>
  );
};
export default SingleResult;
