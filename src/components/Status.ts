export const getStatusColor = (status: FlightStatus) => {
  const statusColor = {
    [FlightStatus.OnTime]: '#4CAF50',
    [FlightStatus.Delayed]: '#FFC107',
    [FlightStatus.Boarding]: '#2196F3',
    [FlightStatus.Departed]: '#FF5722',
  };
  return statusColor[status] || '';
};

export enum FlightStatus {
  OnTime = 'On Time',
  Delayed = 'Delayed',
  Boarding = 'Boarding',
  Departed = 'Departed',
}
