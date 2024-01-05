import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Grid, Paper } from '@mui/material';
import { fetchFlightDetails } from '../../api/flightApi';
import { Heading } from '../../Layout/Heading';
import { FlightInfo } from './FlightInfo';
import { FlightStatus, getStatusColor } from '../Status';
import { formatTime } from '../../utils/DateTimeFormatter';
import { labels } from '../../labels/labels';
import { containerStyles, paperStyles } from './FlightDetailsStyles';
import { circularProgressStyles } from '../commonStyles';
import Body from '../../Layout/Body';

export const FlightDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [flight, setFlight] = useState<Flight>({
    id: '',
    flightNumber: '',
    airline: '',
    origin: '',
    destination: '',
    departureTime: '',
    status: FlightStatus.OnTime,
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
      <FlightInfo label={labels.flightNumber} value={flight.flightNumber} />
      <FlightInfo label={labels.airline} value={flight.airline} />
      <FlightInfo label={labels.origin} value={flight.origin} />
      <FlightInfo label={labels.destination} value={flight.destination} />
      <FlightInfo label={labels.departureTime} value={formatTime(flight.departureTime)} />
      <FlightInfo label={labels.status} value={flight.status} coloredText statusColor={getStatusColor(flight.status)} />
    </Grid>
  );

  return (
    <Body>
      <Container style={containerStyles}>
        {Heading(labels.flightDetailsHeading)}
        <Paper elevation={3} style={paperStyles}>
          {loading ? <CircularProgress style={circularProgressStyles} /> : renderFlightInfo()}
        </Paper>
      </Container>
    </Body>
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
