import {render, screen, waitFor} from '@testing-library/react';
import {FlightStatusTable} from './FlightStatusTable';
import {fetchFlights} from '../../api/flightApi';
import {BrowserRouter} from "react-router-dom";

jest.mock('../../api/flightApi', () => ({
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
        render(<FlightStatusTable />, { wrapper: BrowserRouter });

        await waitFor(() => expect(fetchFlights).toHaveBeenCalled());
        const flightNumberColumn = await waitFor(() => screen.getByText('Flight Number'));
        const origin = await waitFor(() => screen.getByText('Origin'));
        const airline = await waitFor(() => screen.getByText('Airline'));
        expect(flightNumberColumn).toBeInTheDocument();
        expect(origin).toBeInTheDocument();
        expect(airline).toBeInTheDocument();
    });
});
