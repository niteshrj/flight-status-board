import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, CircularProgress, Container, Grid, Paper, Typography} from '@mui/material';
import {fetchFlightDetails} from "../api/api";
import {Heading} from "./Heading";

export const FlightDetails = () => {
    const {id} = useParams();
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
            }
        };
        fetchData();
    }, [id]);

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
                {flight ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Flight Number:</strong> {flight.flightNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Airline:</strong> {flight.airline}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Origin:</strong> {flight.origin}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Destination:</strong> {flight.destination}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Departure Time:</strong> {flight.departureTime}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" style={{ fontSize: '18px' }}>
                                <strong>Status:</strong>
                                <span
                                    style={{
                                        color: statusColor[flight.status],
                                        fontWeight: 'bold',
                                        marginLeft: '5px',
                                    }}
                                >
                                    {flight.status}
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Box textAlign="center">
                        <CircularProgress/>
                    </Box>
                )}
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