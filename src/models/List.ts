export default class List {
  public name!: string;
  public title!: string;
  public list!: string[];

  constructor(name: string, title: string, list: string[] = []) {
    this.name = name;
    this.title = title;
    this.list = list;
  }
}
