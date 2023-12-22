import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFlights } from './api';

describe('fetchFlights', () => {
    let mock: any;
    const url = "https://flight-status-mock.core.travelopia.cloud/flights";

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('fetches successfully data from the API', async () => {
        const mockResponse = { flights: [{ id: 1, name: 'Flight 1' }, { id: 2, name: 'Flight 2' }] };
        mock.onGet(url).reply(200, mockResponse);

        const result = await fetchFlights();

        expect(result).toEqual(mockResponse);
    });

    it('handles an error when fetching data from the API', async () => {
        const errorMessage = 'Network error';
        mock.onGet(url).reply(500, { error: errorMessage });

        try {
            await fetchFlights();
        } catch (error: any) {
            expect(error.response.status).toBe(500);
            expect(error.response.data.error).toBe(errorMessage);
        }
    });
});
