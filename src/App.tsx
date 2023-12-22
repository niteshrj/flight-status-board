import {FlightStatusTable} from "./components/FlightStatusTable";
import {Route, Routes} from "react-router-dom";
import {FlightDetails} from "./components/FlightDetails";

function App() {
  return (
        <Routes>
          <Route path="/" element={<FlightStatusTable/>}/>
          <Route path="/flight-details/:id" element={<FlightDetails/>}/>
        </Routes>
  )
}

export default App
