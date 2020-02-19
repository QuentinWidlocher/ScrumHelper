import Day from "@/models/Day";

export default class DayMapper {
  public static toDay(o: any): Day {
    return new Day(new Date(Date.parse(o.date)), o.lists);
  }

  public static toDayList(o: any[]): Day[] {
    const result: Day[] = [];
    o.forEach((i) => {
      result.push(this.toDay(i));
    });
    return result;
  }
}
