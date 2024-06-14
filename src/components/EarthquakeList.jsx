import  { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const EarthquakeList = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
          params: {
            format: 'geojson',
            starttime: '2023-06-01',
            endtime: '2023-06-30',
            minmagnitude: 5,
            minlatitude: 14,
            maxlatitude: 33,
            minlongitude: -118,
            maxlongitude: -86,
          },
        });

        setEarthquakes(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const handleShow = (earthquake) => {
    setSelectedEarthquake(earthquake);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="earthquake-container position-fixed bottom-0  border bg-light" style={{ width: '300px', height: '400px' }}>
      <h2 className="mb-4">Sistema Sismologico de Mexico</h2>
      <ListGroup>
        {earthquakes.map((earthquake) => (
          <ListGroup.Item 
            key={earthquake.id} 
            onClick={() => handleShow(earthquake)} 
            style={{ cursor: 'pointer' }}>
            Magnitude: {earthquake.properties.mag}, Place: {earthquake.properties.place}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedEarthquake && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Magnitude:</strong> {selectedEarthquake.properties.mag}</p>
            <p><strong>Place:</strong> {selectedEarthquake.properties.place}</p>
            <p><strong>Time:</strong> {new Date(selectedEarthquake.properties.time).toString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EarthquakeList;
