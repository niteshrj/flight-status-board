import {FlightStatusTable} from "./components/FlightStatusTable";
import {Route, Routes} from "react-router-dom";
import {FlightDetails} from "./components/FlightDetails";

function App() {
  return (
        <Routes>
          <Route path="/flight-status" element={<FlightStatusTable/>}/>
          <Route path="/flight-status/:id" element={<FlightDetails/>}/>
        </Routes>
  )
}

export default App
