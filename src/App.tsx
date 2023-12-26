import {FlightStatusTable} from "./components/FlightTable/FlightStatusTable";
import {Route, Routes} from "react-router-dom";
import {FlightDetails} from "./components/FlightDetail/FlightDetails";
import {NotFoundPage} from "./error/NotFoundPage";

function App() {
  return (
        <Routes>
          <Route path="/" element={<FlightStatusTable/>}/>
          <Route path="/flight-status/:id" element={<FlightDetails/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
  )
}

export default App
