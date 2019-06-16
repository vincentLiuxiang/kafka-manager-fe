import { observable, action } from 'mobx';

class MobxStore {
  @observable
  public count = 0;

  @observable
  public other = 0;

  @action.bound
  public otherAdd() {
    this.other++;
  }

  @action.bound
  public minus(): void {
    this.count--;
  }

  @action.bound
  public add(): void {
    this.count++;
  }
}

export const counter = new MobxStore();
