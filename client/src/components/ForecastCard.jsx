import React from 'react';

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt_txt);
  return (
    <div className="forecast-card">
      <h4>{date.toDateString()}</h4>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="icon"
      />
      <p>{data.weather[0].description}</p>
      <p>Temp: {data.main.temp}°C</p>
    </div>
  );
};

export default ForecastCard;
