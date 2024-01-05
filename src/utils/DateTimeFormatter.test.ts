import { formatTime } from './DateTimeFormatter';

describe('formatTime', () => {
  it('formats UTC date string correctly', () => {
    const utcDateString = '2023-01-01T12:34:56.789Z';
    const expectedFormattedTime = '12:34';

    const formattedTime = formatTime(utcDateString);

    expect(formattedTime).toBe(expectedFormattedTime);
  });
});
