// backend/app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import earthquakeRoutes from './routes/earthquake.js';

// Cargar variables de entorno
dotenv.config();

// Verificar que las variables de entorno se cargan correctamente
console.log('MongoDB URI:', import.meta.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/earthquakes', earthquakeRoutes);

mongoose.connect(import.meta.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => console.error(err));

