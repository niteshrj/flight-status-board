import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CircularProgress, Container, Grid, Paper, Typography} from '@mui/material';
import {fetchFlightDetails} from "../api/api";
import {Heading} from "./Heading";

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
        "status": "On Time"
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
            {flightRow('Flight Number', flight.flightNumber)}
            {flightRow('Airline', flight.airline)}
            {flightRow('Origin', flight.origin)}
            {flightRow('Destination', flight.destination)}
            {flightRow('Departure Time', flight.departureTime)}
            {flightRow('Status', flight.status, true)}
        </Grid>
    );

    const flightRow = (
        label: string,
        value: string,
        coloredText?: boolean
    ) => (
        <Grid item xs={12} sm={6}>
            <Typography variant="body1" style={{ fontSize: '18px' }}>
                <strong>{label}:</strong>{' '}
                {coloredText ? (
                    <span
                        style={{
                            color: statusColor[flight.status],
                            fontWeight: 'bold',
                            marginLeft: '5px',
                        }}
                    >
            {value}
          </span>
                ) : (
                    value
                )}
            </Typography>
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
                        <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
                    ) : renderFlightInfo()
                }
            </Paper>
        </Container>
    );
};

const statusColor = {
    "On Time": '#4CAF50',
    "Delayed": '#FFC107',
    "Boarding": '#2196F3',
    "Departed": '#FF5722'
}

interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: "On Time" | "Delayed" | "Boarding" | "Departed";
}