import { observable, action } from 'mobx';
import { getAlarm } from 'lib/api';

export interface IAlarm {
  alarmName: string;
  alarmRuleId: number;
  brokerId: number;
  clusterId: number;
  conditionType: string;
  consumerGroup: string;
  duration: number;
  gmtCreate: number;
  gmtModify: number;
  metricType: string;
  metricValue: number;
  notifyType: string;
  principalList: string[];
  ruleType: string;
  status: number;
  tagName: string;
  topicName: string;
  key?: number;
}

class Alarm {
  @observable
  public data: IAlarm[] = null;

  public curData: IAlarm = null;

  public setCurData(data: IAlarm) {
    this.curData = data;
  }

  @action.bound
  public setAlarm(data: IAlarm[]) {
    this.data = data.map((d, i) => {
      d.key = i;
      return d;
    });
  }

  public getAlarm() {
    getAlarm().then(this.setAlarm);
  }
}

export const alarm = new Alarm();
