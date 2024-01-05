import './App.css';
import { FlightStatusTable } from './components/FlightTable/FlightStatusTable';
import { Route, Routes } from 'react-router-dom';
import { FlightDetails } from './components/FlightDetail/FlightDetails';
import { NotFoundPage } from './error/NotFoundPage';
import WithHeader from './Layout/WithHeader';

function App() {
  return (
    <Routes>
      <Route path="/" element={WithHeader(<FlightStatusTable />)} />
      <Route path="/flight-status/:id" element={WithHeader(<FlightDetails />)} />
      <Route path="*" element={WithHeader(<NotFoundPage />)} />
    </Routes>
  );
}

export default App;
