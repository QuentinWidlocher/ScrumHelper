import List from '@/models/List';
import Day from '@/models/Day';

export class ListService {
  /**
   * Return list by name, use index to get the next or the previous one
   */
  getList(name: string, lists: List[], index = 0): string[] | undefined {
    const listIndex = lists.findIndex((list: List) => list.name === name);
    return lists[listIndex + index].list;
  }

  getListByDay(name: string, day: Day, index = 0): string[] | undefined {
    return this.getList(name, day.lists, index);
  }

  getListIndex(name: string, lists: List[]): number {
    return lists.findIndex((list: List) => list.name === name);
  }

  getListIndexByDay(name: string, day: Day): number {
    return day.lists.findIndex((list: List) => list.name === name);
  }
}

export const listService: ListService = new ListService();
