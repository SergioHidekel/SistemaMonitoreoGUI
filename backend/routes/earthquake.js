// backend/routes/earthquake.js
import express from 'express';
import axios  from'axios';
import Earthquake from '../models/Earthquake';

const router = express.Router();

router.get('/fetch-and-save', async (req, res) => {
  try {
    const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
      params: {
        format: 'geojson',
        starttime: '2000-01-01',
        endtime: new Date().toISOString().split('T')[0],
        minlatitude: 18.800000,
        maxlatitude: 19.200000,
        minlongitude: -98.800000,
        maxlongitude: -97.000000
      }
    });

    const earthquakes = response.data.features.map(feature => ({
      mag: feature.properties.mag,
      place: feature.properties.place,
      time: new Date(feature.properties.time),
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    }));

    await Earthquake.insertMany(earthquakes);

    res.status(200).json({ message: 'Earthquakes saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching and saving earthquake data' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const earthquakes = await Earthquake.find();
    res.status(200).json(earthquakes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching earthquake data' });
  }
});

export default router;
