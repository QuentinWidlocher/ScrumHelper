import List from './List';

export default class Day {
  public date!: Date;
  public lists!: List[];

  constructor (date: Date, lists?: List[]) {
    this.date = date;
    this.lists = lists ? lists : [
      new List('todo', 'To do'),
      new List('inProgress', 'In progress'),
      new List('tomorrow', 'Tomorrow'),
      new List('done', 'Done'),
    ];
  }
}
