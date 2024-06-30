import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Route, Link, Switch } from 'react-router-dom';
import MapComponent from './MapComponent';
import WeatherComponent from './WeatherComponent';
import WeatherMap from './WeatherMap'
import WeatherTable from './WeatherTable'
import EarthquakeMap from './EarthquakeMap'



const Sidebar = () => {
 
  return (
    <Router>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">Monitoreo</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
        <Link to="/" className="nav-link text-white" aria-current="page">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="./MapComponent.jsx" />
              </svg>
              Home
        </Link>
          </li>   
          <li>
        <Link to="/dashboard" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="./WeatherComponent.jsx" />
              </svg>
              Dashboard
        </Link>
          </li>
          <li>
            <Link to="/historico" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#table" />
              </svg>
              Historico
            </Link>
          </li>
          <li>
            <Link to='/notificaciones' className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#grid" />
              </svg>
              Notificaciones
            </Link>
          </li>
          <li>
            <Link to='/customers' className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle" />
              </svg>
              Customers
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://seeklogo.com/images/U/upiita-logo-F3DFC7ADFD-seeklogo.com.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>

        </div>
      </div>

      <Switch>
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
        <Route path='/'>
          <MapComponent/>
        </Route>
      </Switch>
    </Router>


      
  );
};

export default Sidebar;

