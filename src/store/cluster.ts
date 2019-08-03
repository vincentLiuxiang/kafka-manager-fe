import { observable, action } from 'mobx';
import { getClusters } from 'lib/api';

export interface IClusterData {
  bootstrapServers: string;
  brokerNum: number;
  clusterId: number;
  clusterName: string;
  gmtCreate: string;
  gmtModify: string;
  kafkaVersion: string;
  regionNum: number;
  status: number;
  topicNum: number;
  zookeeper: string;
}

class Cluster {
  @observable
  public data: IClusterData[] = [];

  @observable
  public active: number = null;

  @action.bound
  public setData(data: IClusterData[]) {
    data.unshift({
      clusterId: -1,
      clusterName: '所有集群',
    } as IClusterData);
    this.data = data;
    this.active = (this.data[0] || { clusterId: null }).clusterId;
  }

  @action.bound
  public changeCluster(data: number) {
    this.active = data;
  }

  public getClusters() {
    getClusters().then(this.setData);
  }
}

export const cluster = new Cluster();
