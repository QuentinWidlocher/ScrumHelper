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
    return new Day(new Date());
  }

  isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }
}

export const dayService: DayService = new DayService();
