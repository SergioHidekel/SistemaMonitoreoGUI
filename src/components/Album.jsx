//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
//import MapComponent from './MapComponent';
import WeatherComponent from './WeatherComponent';
import WeatherMap from './WeatherMap'
import WeatherTable from './WeatherTable'
import EarthquakeMap from './EarthquakeMap'
import Sidebar from './Sidebar'

const Album = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display:'flex', flexDirection: 'column',  width: '100%'}}>
        <main className="flex-shrink-0">
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Sistema de Monitoreo</h1>
                <p className="lead text-body-secondary">
                Sistema de monitoreo de datos del Cinturón Volcánico Transversal, en el cual se captura la información de los volcanes Popocatepetl, Iztaccihuatl y Pico de Orizaba
                </p>
              </div>
            </div>
          </section>

          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                <div className="col" /*key={index}*/>
                    <div className="card shadow-sm">
                      <img src="https://st2.depositphotos.com/2561639/11763/i/950/depositphotos_117634350-stock-photo-active-popocatepetl-volcano-in-mexico.jpg" className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Popocatepetl" />
                      <div className="card-body">
                        <p className="card-text">Popocatepetl. Se muestra la información de disminución de nieve en los últimos 10 años y nivel de temperatura.</p>
                        <div className="d-flex justify-content-between align-items-center">

                          <small className="text-body-secondary">Zona 1</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col" /*key={index}*/>
                    <div className="card shadow-sm">
                      <img src="https://i.pinimg.com/originals/51/a0/80/51a08096d473c650509665bcc154907d.jpg" className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Iztaccihuatl" />
                      <div className="card-body">
                        <p className="card-text">Iztaccihuatl. Muestra la concentración de dióxido de carbono en la zona, ácido sulfúrico y niveles de temperatura.</p>
                        <div className="d-flex justify-content-between align-items-center">

                          <small className="text-body-secondary">Zona 2</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col" /*key={index}*/>
                    <div className="card shadow-sm">
                      <img src="https://en.academic.ru/pictures/enwiki/80/Pico_de_Orizaba_1_Zoom.jpg" className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Pico de Orizaba<" />
                      <div className="card-body">
                        <p className="card-text">Pico de Orizaba. Se muestra información sobre la actividad sísmica de la zona y el histórico en general.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">

                          </div>
                          <small className="text-body-secondary">Zona 3</small>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </main>
      </div>


      <Switch>
        <Route path='/sidebar'>
            <Sidebar/>
          </Route>
          <Route path='/historico'>
            <WeatherTable/>
          </Route>
          <Route path='/customers'>
            <WeatherMap/>
          </Route>
          <Route path='/dashboard'>
            <WeatherComponent/>
          </Route>
          <Route path='/notificaciones'>
            <EarthquakeMap/>
          </Route>
        </Switch>
    </Router>
    
  );
};

export default Album;

/*
 {Array.from({ length: 4 }).map((_, index) => (*/