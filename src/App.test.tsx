import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./api/flightApi', () => ({
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
  fetchFlights: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        flightNumber: 'ABC123',
        airline: 'Example Airline',
        origin: 'City A',
        destination: 'City B',
        departureTime: '2023-01-01T12:00:00Z',
        status: 'On Time',
      },
    ]),
  ),
}));

describe('App', () => {
  test('renders with FlightStatusTable for the root path', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={['/flight-status']}>
          <App />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with FlightDetails for the flight-details/:id path', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={['/flight-status/123']}>
          <App />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
