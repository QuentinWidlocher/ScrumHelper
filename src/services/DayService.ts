import Day from '@/models/Day';
import DayMapper from "@/mappers/DayMapper";

export class DayService {
    get savedDays(): Day[] {
        const days = localStorage.getItem('days');
        return days ? DayMapper.toDayList(JSON.parse(days)) : [];
    }

    set savedDays(days: Day[]) {
        localStorage.setItem('days', JSON.stringify(days));
    }
}

export const dayService: DayService = new DayService();
