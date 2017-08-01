export class Todo {
  id: number;
  title: string;
  done: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
