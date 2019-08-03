import { observable, action } from 'mobx';
import { getTopic, getTopicBasicInfo, getTopicConsumeInfo, getTopicStatusInfo, getGroupInfo } from 'lib/api';

export interface ITopic {
  clusterId: number;
  clusterName?: string;
  topicName: string;
  partitionNum?: number;
  replicaNum?: number;
  byteIn?: number;
  byteOut?: number;
  messageIn?: number;
  updateTime?: number;
  principals?: string;
  favorite?: boolean;
  key?: number | string;
}

export interface ITopicBaseInfo {
  brokerNum: number;
  createTime: string;
  description: string;
  modifyTime: string;
  partitionNum: number;
  principals: string;
  regionNames: string;
  replicaNum: number;
  retentionTime: number;
  topicName: string;
}

export interface ITopicConsumeInfo {
  location: string;
  consumerGroup: string;
  key?: string;
}

export interface ITopicStatusInfo {
  byteIn: number[];
  byteOut: number[];
  byteRejected: number[];
  failedFetchRequest: number[];
  failedProduceRequest: number[];
  messageIn: number[];
  totalProduceRequest: number[];
  [key: string]: number[];
}

export interface IGroupInfo {
  clientId: string;
  clusterId: number;
  consumeOffset: number;
  consumerGroup: string;
  lag: number;
  location: string;
  partitionId: number;
  partitionOffset: number;
  topicName: string;
  key?: string;
}

class Topic {
  @observable
  public data: ITopic[] = [];

  @observable
  public baseInfo: ITopicBaseInfo = null;

  @observable
  public consumeInfo: ITopicConsumeInfo[] = [];

  @observable
  public groupInfo: IGroupInfo[] = [];

  @observable
  public statusInfo: ITopicStatusInfo = null;

  public currentTopicName = '';
  public currentClusterId: number = null;

  @action.bound
  public setData(data: ITopic[]) {
    this.data = data;
  }

  @action.bound
  public setTopicBaseInfo(data: ITopicBaseInfo) {
    this.baseInfo = data;
  }

  @action.bound
  public setTopicConsumeInfo(data: ITopicConsumeInfo[]) {
    this.consumeInfo = data.map(d => { d.key = d.consumerGroup; return d; } );
  }

  @action.bound
  public setTopicStatusInfo(data: ITopicStatusInfo) {
    this.statusInfo = data;
  }

  @action.bound
  public setGroupInfo(data: IGroupInfo[]) {
    this.groupInfo = data.map(d => { d.key = d.clientId; return d; });
  }

  public getTopics() {
    getTopic().then(this.setData);
  }

  public getTopicBasicInfo(topic: string, clusterId: number) {
    getTopicBasicInfo(topic, clusterId).then(this.setTopicBaseInfo);
  }

  public getTopicConsumeInfo(clusterId: number) {
    getTopicConsumeInfo(clusterId).then(this.setTopicConsumeInfo);
  }

  public getTopicStatusInfo(topic: string, clusterId: number) {
    this.currentTopicName = topic;
    this.currentClusterId = clusterId;
    getTopicStatusInfo(topic, clusterId).then(this.setTopicStatusInfo);
  }

  public getGroupInfo(topic: string, clusterId: number, group: string, location: string) {
    getGroupInfo(topic, clusterId, group, location).then(this.setGroupInfo);
  }
}

export const topic = new Topic();
