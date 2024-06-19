import  { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const paramsList = [
    {
      latitude: 19.1297,
      longitude: -98.5031,
      current: "snowfall",
      hourly: ["temperature_2m", "precipitation", "snowfall"]
    },
    {
      latitude: 19.1783588,
      longitude: -98.6530277,
      current: "snowfall",
      hourly: ["temperature_2m", "precipitation", "snowfall"]
    },
    {
      latitude: 19.0304015,
      longitude: -97.2783758,
      current: "snowfall",
      hourly: ["temperature_2m", "precipitation", "snowfall"]
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.all(paramsList.map(params => fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)));
      const weatherData = responses.map(response => {
        const data = response[0];
        const utcOffsetSeconds = data.utcOffsetSeconds();
        const current = data.current();
        const hourly = data.hourly();

        const range = (start, stop, step) => 
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        return {
          location: {
            latitude: data.latitude(),
            longitude: data.longitude(),
          },
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            snowfall: current.variables(0).value(),
          },
          hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            precipitation: hourly.variables(1).valuesArray(),
            snowfall: hourly.variables(2).valuesArray(),
          },
        };
      });
      setWeatherData(weatherData);
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  };

  return (
    <div className="container mt-5">
      {weatherData.length > 0 ? (
        weatherData.map((data, index) => {
          const chartData = {
            labels: data.hourly.time.map(formatDate),
            datasets: [
              {
                label: 'Temperature (2m)',
                data: data.hourly.temperature2m,
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
              },
              {
                label: 'Precipitation',
                data: data.hourly.precipitation,
                borderColor: 'rgba(54,162,235,1)',
                fill: false,
              },
              {
                label: 'Snowfall',
                data: data.hourly.snowfall,
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
              },
            ],
          };

          const options = {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Values',
                },
              },
            },
          };

          return (
            <div className="card mb-4" key={index}>
              <div className="card-body">
                <h1 className="card-title">Comportamiento climatico zona:  {index + 1}</h1>
                <p className="card-text">Latitud: {data.location.latitude}</p>
                <p className="card-text">Longitud: {data.location.longitude}</p>
                <p className="card-text">Tiempo Actual: {data.current.time.toISOString()}</p>
                <p className="card-text">Nevadas: {data.current.snowfall}</p>
                <h2 className="mt-4">Histograma</h2>
                <Line data={chartData} options={options} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
