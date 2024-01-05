export const formatTime = (utcDateString: any) => {
  const utcDate = new Date(utcDateString);
  const hours = utcDate.getUTCHours();
  const minutes = utcDate.getUTCMinutes();
  return `${hours}:${minutes}`;
};
