import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FlightDetails } from './FlightDetails';

jest.mock('../../api/flightApi', () => ({
  fetchFlightDetails: jest.fn(() =>
    Promise.resolve({
      id: 1,
      flightNumber: 'ABC123',
      airline: 'Example Airline',
      origin: 'City A',
      destination: 'City B',
      departureTime: '2023-01-01T12:00:00Z',
      status: 'On Time',
    }),
  ),
}));

test('renders flight details correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/flights/validFlightId']}>
      <FlightDetails />
    </MemoryRouter>,
  );

  await waitFor(() => screen.getByText('Flight Details'));

  expect(screen.getByText('City A')).toBeInTheDocument();
  expect(screen.getByText('Example Airline')).toBeInTheDocument();
  expect(screen.getByText('City B')).toBeInTheDocument();
  expect(screen.getByText('12:0')).toBeInTheDocument();
  expect(screen.getByText('On Time')).toBeInTheDocument();
});
