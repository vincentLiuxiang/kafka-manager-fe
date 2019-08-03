import fetch from './fetch';
import { ITopic } from 'store/topic';

export const getClusters = () => {
  return fetch('/clusters');
};

export const getTopic = () => {
  return fetch('/topics');
};

export const collect = (topicFavoriteList: ITopic[]) => {
  return fetch('/topics/favorite', {
    body: {
      topicFavoriteList,
    },
  });
};

export const uncollect = (topicFavoriteList: ITopic[]) => {
  return fetch('/topics/favorite', {
    method: 'DELETE',
    body: {
      topicFavoriteList,
    },
  });
};

export const getTopicBasicInfo = (topicName: string, clusterId: number) => {
  return fetch(`/${clusterId}/topics/${topicName}/basic-info`);
};

export const getTopicConsumeInfo = (clusterId: number) => {
  return fetch(`/${clusterId}/consumers/consumer-groups`);
};

export const getTopicStatusInfo = (topicName: string, clusterId: number) => {
  return fetch(`/${clusterId}/topics/${topicName}/status`);
};

export const getGroupInfo = (topicName: string, clusterId: number, group: string, location: string) => {
  return fetch(`/${clusterId}/consumers/${group}/topics/${topicName}/consume-detail?location=${location}`);
};

export const getTopicOrder = () => {
  return fetch('/orders/topic');
};

export const getPartitionOrder = () => {
  return fetch('/orders/partition');
};

export const getAlarm = () => {
  return fetch(`/alarms/alarm-rules`);
}
