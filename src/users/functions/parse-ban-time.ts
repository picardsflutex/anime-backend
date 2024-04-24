import {addMonths , addDays, addHours, addMinutes, addSeconds } from 'date-fns';

export function parseTimeOfBan(timeOfBan: string): Date | null {
  const timeRegex = /(\d+d)?\s?(\d+h)?\s?(\d+m)?\s?(\d+s)?/i;
  const permanentRegex = /(permanent)/i;

  const matchTime = timeRegex.exec(timeOfBan);
  const matchPermanent = permanentRegex.exec(timeOfBan);

  if (matchPermanent) {
    return null;
  }

  let currentDate = new Date();

  if (matchTime) {
    const [months, days, hours, minutes, seconds] = matchTime;

    if (months) {
      const numMonths = parseInt(months);
      currentDate = addMonths(currentDate, numMonths);
    }

    if (days) {
      const numDays = parseInt(days);
      currentDate = addDays(currentDate, numDays);
    }

    if (hours) {
      const numHours = parseInt(hours);
      currentDate = addHours(currentDate, numHours);
    }

    if (minutes) {
      const numMinutes = parseInt(minutes);
      currentDate = addMinutes(currentDate, numMinutes);
    }

    if (seconds) {
      const numSeconds = parseInt(seconds);
      currentDate = addSeconds(currentDate, numSeconds);
    }
  }

  return currentDate;
}