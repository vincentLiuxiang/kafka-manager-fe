import * as React from 'react';
import './index.less';
import { NetWorkFlow, StatusGragh, Group, Base } from './com';
import { Input } from 'component/antd';
import Url from 'lib/url-parser';
import { topic } from 'store/topic';

const Search = Input.Search;

export class TopicDetail extends React.Component {
  public clusterId: number;
  public topicName: string;

  public componentDidMount() {
    const url = Url();
    this.clusterId = Number(url.search.clusterId);
    this.topicName = url.search.topic;

    topic.getTopicBasicInfo(this.topicName, this.clusterId);
    topic.getTopicStatusInfo(this.topicName, this.clusterId);
    topic.getTopicConsumeInfo(this.clusterId);
  }

  public updateStatus = () => {
    topic.getTopicStatusInfo(this.topicName, this.clusterId);
  }

  public render() {
    return (
      <>
        <div className="k-row mb-24">
          <div className="k-top-row" style={{ width: '35%', float: 'left' }}>
            <p className="k-title">基本详情</p>
            <Base />
          </div>
          <div className="k-top-row" style={{ width: '65%', float: 'right' }}>
            <p className="k-title">消费组详情</p>
            <Search placeholder="请输入消费组名称" enterButton="搜索" className="group-search"/>
            <Group />
          </div>
        </div>
        <div className="k-row right-flow mb-24">
          <p className="k-title">状态图</p>
          <span className="k-abs" onClick={this.updateStatus}>
            <i className="k-icon-shuaxin didi-theme"/>刷新
          </span>
          <StatusGragh />
        </div>
        <div className="k-row">
          <p className="k-title">流量图</p>
          <NetWorkFlow />
        </div>
      </>
    );
  }
}
