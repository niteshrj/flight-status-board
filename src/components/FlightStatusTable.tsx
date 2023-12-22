import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchFlights} from "../api/api";
import {useNavigate} from "react-router-dom";

const columns: GridColDef[] = [
    {field: 'flightNumber', headerName: 'Flight Number', width: 200},
    {field: 'airline', headerName: 'Airline', width: 200},
    {field: 'origin', headerName: 'Origin', width: 200},
    {field: 'destination', headerName: 'Destination', width: 200},
    {
        field: 'departureTime',
        headerName: 'Departure Time',
        width: 250,
        valueGetter: (params: GridValueGetterParams) => {
            const utcDate = new Date(params.row.departureTime);
            return `${utcDate.getHours()}:${utcDate.getMinutes()}`
        },
    },
    {field: 'status', headerName: 'Status', width: 200},
];

export function FlightStatusTable() {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFlightsData = async () => {
            try {
                const response = await fetchFlights();
                setFlights(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchFlightsData();
        const intervalId = setInterval(fetchFlightsData, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (<Container>
        <Paper>
            <DataGrid
                columns={columns}
                rows={flights}
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 10},
                    },
                }}
                pageSizeOptions={[10]}
                onRowClick={(params) => {
                    navigate(`/flight-details/${+params.id}`);
                }}
            />
        </Paper>
    </Container>);
}