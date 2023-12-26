import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {CircularProgress, Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchFlights} from "../../api/flightApi";
import {useNavigate} from "react-router-dom";
import {Heading} from "../Heading";
import {FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS} from "../../constants";
import {getStatusColor} from "../Status";
import {formatTime} from "../../utils/DateTimeFormater";

export function FlightStatusTable() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFlightsData = async () => {
            try {
                const response = await fetchFlights();
                setFlights(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFlightsData();
        const intervalId = setInterval(fetchFlightsData, FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS);
        return () => clearInterval(intervalId);
    }, []);

    return (<Container>
        {Heading(`Flight Status`)}
        <Paper
            style={{
                backgroundColor: '#f4f4f4',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            {loading ? (
                    <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
                ) : (
            <DataGrid
                sx={{ fontSize: '18px' }}
                columns={columns}
                rows={flights}
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 10},
                    },
                }}
                pageSizeOptions={[10]}
                onRowClick={(params) => {
                    navigate(`/flight-status/${+params.id}`);
                }}
            />)}
        </Paper>
    </Container>);
}

const columns: GridColDef[] = [
    {field: 'flightNumber', headerName: 'Flight Number', width: 200},
    {field: 'airline', headerName: 'Airline', width: 200},
    {field: 'origin', headerName: 'Origin', width: 200},
    {field: 'destination', headerName: 'Destination', width: 160},
    {
        field: 'departureTime',
        headerName: 'Departure Time',
        width: 250,
        align: 'center',
        headerAlign: 'center',
        valueGetter: (params: GridValueGetterParams) => {
            return formatTime(params.row.departureTime)
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        renderCell: (params: any) => {
            return <span
                style={{
                    color: getStatusColor(params.row.status),
                }}
            >
          {params.row.status}
        </span>
        }
    },
];

