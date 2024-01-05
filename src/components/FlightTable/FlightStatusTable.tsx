import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Container, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchFlights } from '../../api/flightApi';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../Heading';
import { FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS } from '../../constants';
import { columns } from './Columns';

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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlightsData();
    const intervalId = setInterval(fetchFlightsData, FLIGHTS_FETCH_REFRESH_RATE_IN_MILLIS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
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
  );
}
