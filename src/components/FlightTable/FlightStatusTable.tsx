import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Container, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchFlights } from '../../api/flightApi';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../Layout/Heading';
import { FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS } from '../../utils/constants';
import { columns } from './Columns';
import { labels } from '../../labels/labels';
import { paperStyles } from './FlightStatusTableStyles';
import { circularProgressStyles } from '../commonStyles';
import Body from '../../Layout/Body';
import ErrorPage from '../../error/ErrorPage';

export function FlightStatusTable() {
  const [error, setError] = useState(false);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const response = await fetchFlights();
        setFlights(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      }
    };
    fetchFlightsData();
    const intervalId = setInterval(fetchFlightsData, FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <Body>
        <ErrorPage errorMessage={labels.flightStatusNotFoundErrorMessage} />
      </Body>
    );
  }

  return (
    <Body>
      <Container>
        {Heading(labels.flightStatusHeading)}
        <Paper style={paperStyles}>
          {loading ? (
            <CircularProgress style={circularProgressStyles} />
          ) : (
            <DataGrid
              sx={{ fontSize: '18px' }}
              columns={columns}
              rows={flights}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10]}
              onRowClick={(params) => {
                navigate(`/flight-status/${+params.id}`);
              }}
            />
          )}
        </Paper>
      </Container>
    </Body>
  );
}
