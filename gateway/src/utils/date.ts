export const addMinutes = (number: number, date = new Date()): Date => {
  date.setMinutes(date.getMinutes() + number);
  return date;
};

export const addSeconds = (number: number, date = new Date()): Date => {
  date.setSeconds(date.getSeconds() + number);
  return date;
};

export const relativeTime = (date: Date): string => {
  const time = Math.floor((new Date(date).valueOf() - new Date().valueOf()) / 1000);
  const { interval, unit } = calculateTimeDifference(time);
  const suffix = interval === 1 ? '' : 's';
  return `in ${interval} ${unit}${suffix}`;
};

const units = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 },
];

const calculateTimeDifference = (time: number) => {
  for (const { label, seconds } of units) {
    const interval = Math.floor(time / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        unit: label,
      };
    }
  }
  return {
    interval: 0,
    unit: '',
  };
};
