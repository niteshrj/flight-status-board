import {render, screen, waitFor} from '@testing-library/react';
import {FlightStatusTable} from './FlightStatusTable';
import {fetchFlights} from '../api/api';

jest.mock('../api/api', () => ({
    fetchFlights: jest.fn(() => Promise.resolve([
        {
            id: 1,
            flightNumber: 'ABC123',
            airline: 'Example Airline',
            origin: 'City A',
            destination: 'City B',
            departureTime: '2023-01-01T12:00:00Z',
            status: 'On Time',
        },
    ])),
}));

describe('FlightStatusTable', () => {
    it('renders flight number column in the table', async () => {
        render(<FlightStatusTable />);

        await waitFor(() => expect(fetchFlights).toHaveBeenCalled());
        const flightNumberColumn = await screen.getByText('Flight Number');
        expect(flightNumberColumn).toBeInTheDocument();
    });
});
