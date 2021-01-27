import {Moment} from 'moment';
import * as moment from 'moment';

export class DateUtils {
  static createMomentDate(year: string | number, month: string | number, day: string | number): Moment | null {
    const date = moment.utc();
    date.set('year', Number(year));
    date.set('month', Number(month));
    date.set('date', Number(day));
    date.set('hour', 0);
    date.set('minutes', 0);
    return date;
  }
}
