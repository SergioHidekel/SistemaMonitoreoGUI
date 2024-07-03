import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchWeatherApi } from 'openmeteo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';

const Acido = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          latitude: 18.8006,
          longitude: -98.9102,
          hourly: ["relative_humidity_2m", "evapotranspiration"]
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        // Helper function to form time ranges
        const range = (start, stop, step) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        
        const hourly = response.hourly();
        
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            relativeHumidity2m: hourly.variables(0).valuesArray(),
            evapotranspiration: hourly.variables(1).valuesArray(),
          },
        };
        
        setWeatherData(weatherData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

  const chartData = {
    labels: weatherData.hourly.time.map(time => time.toISOString()),
    datasets: [
      {
        label: 'Ácido sulfúrico',
        data: weatherData.hourly.relativeHumidity2m,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Dióxido de carbono',
        data: weatherData.hourly.evapotranspiration,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Niveles de Ácido sulfúrico y Dióxido de carbono en la Zona 2 </h1>
      <div className="card">
        <div className="card-body">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Acido;

