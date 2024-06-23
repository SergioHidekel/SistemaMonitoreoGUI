import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: 19.1297,
            longitude: -98.5031,
            current: 'snowfall',
            hourly: 'precipitation,snowfall,snow_depth',
            timezone: 'GMT',
            past_days: 5
          }
        });
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('weather_data.pdf');
    });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Análisis de nieve en la zona 1</h2>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={handleDownloadPDF}>Download PDF</button>
      </div>
      <div className="table-responsive" ref={tableRef}>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Fecha y Hora</th>
              <th>Precipitation</th>
              <th>Snowfall</th>
              <th>Snow Depth</th>
            </tr>
          </thead>
          <tbody>
            {weatherData?.hourly.time.map((time, index) => (
              <tr key={time}>
                <td>{time}</td>
                <td>{weatherData?.hourly.precipitation[index]}</td>
                <td>{weatherData?.hourly.snowfall[index]}</td>
                <td>{weatherData?.hourly.snow_depth[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherTable;
