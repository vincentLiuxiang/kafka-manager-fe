import { observable, action } from 'mobx';
import { getTopicOrder, getPartitionOrder } from 'lib/api';

const statusMap = ['待审批', '通过', '拒绝', '撤销'];

export interface IBaseOrder {
  orderId: number;
  clusterId: number;
  clusterName: string;
  topicName: string;
  peakBytesInPerSec: number;
  applicant: string;
  principals: string;
  description: string;
  orderStatus: number;
  approver: string;
  approvalOpinions: string;
  gmtCreate: number;
  gtModify: number;
  statusStr?: string;
  key?: number;
}

export interface IPartitionOrder extends IBaseOrder {
  peakAvgBytesInPerSec: number;
}

class Order {
  @observable
  public topicOrder: IBaseOrder[] = [];

  @observable
  public partitionOrder: IPartitionOrder[] = [];

  @action.bound
  public setTopicOrder(data: IBaseOrder[]) {
    this.topicOrder = data.map((d) => {
      d.statusStr = statusMap[d.orderStatus];
      d.key = d.orderId;
      return d;
    });
  }

  @action.bound
  public setPartitionOrder(data: IPartitionOrder[]) {
    this.partitionOrder = data.map((d) => {
      d.statusStr = statusMap[d.orderStatus];
      d.key = d.orderId;
      return d;
    });
  }

  public getOrder() {
    getTopicOrder().then(this.setTopicOrder);
    getPartitionOrder().then(this.setPartitionOrder);
  }
}

export const order = new Order();
