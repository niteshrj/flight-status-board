import './App.css';
import { FlightStatusTable } from './components/FlightTable/FlightStatusTable';
import { Route, Routes } from 'react-router-dom';
import { FlightDetails } from './components/FlightDetail/FlightDetails';
import WithHeader from './Layout/WithHeader';
import ErrorPage from './error/ErrorPage';
import { labels } from './labels/labels';

function App() {
  return (
    <Routes>
      <Route path="/" element={WithHeader(<FlightStatusTable />)} />
      <Route path="/flight-status/:id" element={WithHeader(<FlightDetails />)} />
      <Route path="*" element={WithHeader(<ErrorPage errorMessage={labels.pageNotFoundErrorMessage} />)} />
    </Routes>
  );
}

export default App;
