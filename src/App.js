import React, { useState } from 'react';
import  './App.css';
 const api ={
   key:'ce5eba9cbfa752b403f382bb3a0ad604',
   base:'http://api.openweathermap.org/data/2.5/'
 }

function App() {
  const [city, setCity] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt =>{
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather (result);
        setCity('');
        console.log(result);
      });
    }
  }
  const format_date = (d) =>{
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    
    let day  = days[d.getDay()];
    let date  = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app warn">
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{format_date(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    
    </div>
  );
}

export default App;
