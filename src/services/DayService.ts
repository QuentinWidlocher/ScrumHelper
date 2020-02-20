import Day from '@/models/Day';
import DayMapper from '@/mappers/DayMapper';

export class DayService {
  get savedDays(): Day[] {
    const days = localStorage.getItem('days');

    // Parse the JSON into a nice Day[] or return an empty list
    return days ? DayMapper.toDayList(JSON.parse(days)) : [];
  }

  set savedDays(days: Day[]) {
    localStorage.setItem('days', JSON.stringify(days));
  }

  createNewDay(): Day {
    // TODO : Remove debug date falsification
    return new Day(new Date(localStorage.getItem('today')!));
  }

  isToday(date: Date): boolean {
    // TODO : Remove debug date falsification
    return date.toDateString() === new Date(localStorage.getItem('today')!).toDateString();
  }
}

export const dayService: DayService = new DayService();
