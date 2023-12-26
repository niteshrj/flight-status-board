import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CircularProgress, Container, Grid, Paper} from '@mui/material';
import {fetchFlightDetails} from "../../api/flightApi";
import {Heading} from "../Heading";
import {FlightInfo} from "./FlightInfo";
import {FlightStatus, getStatusColor} from "../Status";
import {formatTime} from "../../utils/DateTimeFormater";

export const FlightDetails = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [flight, setFlight] = useState<Flight>({
        "id": "",
        "flightNumber": "",
        "airline": "",
        "origin": "",
        "destination": "",
        "departureTime": "",
        "status": FlightStatus.OnTime
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const flightDetails = await fetchFlightDetails(id);
                setFlight(flightDetails);
            } catch (error: any) {
                console.error('Error fetching flight details:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const renderFlightInfo = () => (
        <Grid container spacing={2}>
            <FlightInfo label="Flight Number" value={flight.flightNumber}/>
            <FlightInfo label="Airline" value={flight.airline}/>
            <FlightInfo label="Origin" value={flight.origin}/>
            <FlightInfo label="Destination" value={flight.destination}/>
            <FlightInfo label="Departure Time" value={formatTime(flight.departureTime)}/>
            <FlightInfo label="Status" value={flight.status} coloredText statusColor={getStatusColor(flight.status)}/>
        </Grid>
    );

    return (
        <Container style={{marginBottom: '20px'}}>
            {Heading("Flight Details")}
            <Paper
                elevation={3}
                style={{
                    padding: '20px',
                    marginBottom: '20px',
                    backgroundColor: '#f4f4f4',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {loading ? (
                    <CircularProgress style={{margin: '50px auto', display: 'block'}}/>
                ) : renderFlightInfo()
                }
            </Paper>
        </Container>
    );
};

interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: FlightStatus;
}