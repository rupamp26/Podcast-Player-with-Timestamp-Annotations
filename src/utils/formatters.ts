export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const formattedMins = mins.toString().padStart(hrs > 0 ? 2 : 1, '0');
  const formattedSecs = secs.toString().padStart(2, '0');
  
  return hrs > 0 
    ? `${hrs}:${formattedMins}:${formattedSecs}`
    : `${formattedMins}:${formattedSecs}`;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};