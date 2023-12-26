import React ,{ useState, useEffect } from "react";
import "./App.css";

// Api key: 784f574c331c40c2ba361810231812

const API_URL = 'https://api.weatherapi.com/v1/forecast.json?key=784f574c331c40c2ba361810231812';

const App = () => { 
  
  const [searchTerm, setSearchTerm] = useState();
  const [weatherdata, setWeatherdata] = useState();

  const searchCiyInfo = async(city)=>{
    const response = await fetch(`${API_URL}&q=${city}`);
    const data = await response.json();

    if(response.json ){
      setWeatherdata(data);
    }
    else{
      console.log(`${data.message}`);
    }
  }


  return (
    <>
      <div className="bg-gradient-to-b from-blue-400 to-blue-800 text-white min-h-screen">
        <div className="container m-auto p-8  flex-cols items-center justify-center" >
          <h1 className="text-4xl font-bold mb-4">Weather Forecast</h1>

          {/* <!-- Input Section --> */}
          <div className="mb-4">
            <label className="block text-xl font-semibold mb-2">
              Enter City Name: 
            </label>
            <div className="flex outline-none">
              <input id='inputcity'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="E.g., New York"
                className="flex-1 py-2 px-4 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
              <button
                type="button"
                onClick={()=>searchCiyInfo(searchTerm)}
                className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:border-blue-300 outline-none"
              >
                Search
              </button>
            </div>
          </div>

          {/* <!-- Weather Card --> */}
          <div className="bg-white bg-opacity-30 p-6 rounded-md shadow-md">
            {/* <!-- Location --> */}
            <div className="text-xl font-semibold mb-4">City Name: {weatherdata && `${weatherdata.location.name}, ${weatherdata.location.region}, ${weatherdata.location.country}.`} </div>

            {/* <!-- Current Weather --> */}
            <div className="flex items-center mb-4">
              <div className="text-5xl font-bold sm:text-2xl">{weatherdata && `${weatherdata.current.temp_c}°C`}</div>
              <div className="ml-4">
                <div className="text-2xl flex items-center"> 
                  <span className="flex justify-center align-center">{weatherdata && `${weatherdata.current.condition.text}`}</span>
                  <img src={weatherdata && `${weatherdata.current.condition.icon}`} alt="" />
                </div>
                <p className="text-gray-500">Wind: {weatherdata && `${weatherdata.current.wind_mph}mph`}</p>
              </div>  
            </div>

            {/* <!-- Forecast --> */}
            <div className="flex flex-wrap items-center  ">
              {weatherdata.forecast.forecastday.map((day)=>(
                <div key={day.date} className="text-center flex justify-evenly">
                  <div className="text-center ml-1 mr-1">
                    <label className="text-xl font-semibold">Max. Temperature </label>
                    <p className="text-gray-500">{day.day.maxtemp_c}°C</p>
                  </div>
                  <div className="text-center ml-1 mr-1">
                  <label className="text-xl font-semibold">Min. Temperature </label>
                    <p className="text-gray-500"> {day.day.mintemp_c}°C</p>
                  </div>
                </div>
              ))}
              <div className="text-center ml-1 mr-1">
                    <label className="text-xl font-semibold">Wind Speed </label>
                    <p className="text-gray-500">{weatherdata.current.wind_kph}kph</p>
                  </div>
              </div>
          </div>)
          
        </div>
      </div>
    </>
  );
}

export default App;
