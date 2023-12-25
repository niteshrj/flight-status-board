import axios from 'axios';

const baseURL = 'https://flight-status-mock.core.travelopia.cloud';

export const fetchFlights = async () => {
    try {
        const response = await axios.get(`${baseURL}/flights`);
        return response.data;
    } catch (error) {
        console.log('Error fetching flights:', error);
        throw error;
    }
};

export const fetchFlightDetails = async (id: string | undefined) => {
    try {
        const response = await axios.get(`${baseURL}/flights/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching flight Details:', error);
        throw error;
    }
};