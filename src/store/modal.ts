import { observable, action } from 'mobx';
import { alarm, IAlarm } from './alarm';

class Modal {
  @observable
  public id: string = null;

  @action.bound
  public showNewTopic() {
    this.id = 'showNewTopic';
  }

  @action.bound
  public showNewCluster() {
    this.id = 'showNewCluster';
  }

  @action.bound
  public showModifyCluster() {
    this.id = 'showModifyCluster';
  }

  @action.bound
  public showModifyTopic() {
    this.id = 'showModifyTopic';
  }

  @action.bound
  public showAlarm(r: IAlarm) {
    alarm.setCurData(r);
    this.id = 'showAlarm';
  }

  @action.bound
  public showExpandTopic() {
    this.id = 'showExpandTopic';
  }

  @action.bound
  public showResetOffset() {
    this.id = 'showResetOffset';
  }

  @action.bound
  public close() {
    this.id = null;
  }
}

export const modal = new Modal();
