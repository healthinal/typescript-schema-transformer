import { isValid, parse, parseISO } from 'date-fns/fp';
import { pipe } from 'ramda';

const dateFormat = 'yyyy-MM-dd';
const timeFormat = 'HH:mm:ss';

const isValidDateTimeFormat = (format: string) =>
  pipe(parse(0, format), isValid);
export const isValidDate = isValidDateTimeFormat(dateFormat);
export const isValidTime = isValidDateTimeFormat(timeFormat);
export const isValidIsoDate = pipe(parseISO, isValid);
