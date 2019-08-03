import * as React from 'react';

import { Table, Tabs, PaginationConfig } from 'component/antd';
import Url from 'lib/url-parser';
import { modal } from 'store';
import { topic } from 'store/topic';
import { observer } from 'mobx-react';

const TabPane = Tabs.TabPane;

const collectionColumns = [
  {
    title: 'Partition ID',
    dataIndex: 'partitionId',
    key: 'partitionId',
  },
  {
    title: 'Consumer ID',
    dataIndex: 'clientId',
    key: 'clientId',
  },
  {
    title: 'Consumer Offset',
    dataIndex: 'consumeOffset',
    key: 'consumeOffset',
  },
  {
    title: 'Lag',
    dataIndex: 'lag',
    key: 'lag',
  },
];

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

@observer
export class Consumer extends React.Component {
  public clusterId: number;
  public topicName: string;
  public group: string;
  public location: string;

  public componentDidMount() {
    const url = Url();
    this.clusterId = Number(url.search.clusterId);
    this.topicName = url.search.topic;
    this.location = url.search.location;
    this.group = url.search.group;

    topic.getGroupInfo(this.topicName, this.clusterId, this.group, this.location);
  }

  public renderConsumer() {
    return (
      <Table
        columns={collectionColumns}
        dataSource={topic.groupInfo}
        pagination={pagination}
      />
    );
  }

  public render() {
    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic">
            <i className="k-icon-shuaxin didi-theme"/>刷新
          </li>
          <li className="new-topic" onClick={modal.showResetOffset}>
            <i className="k-icon-chongzhi didi-theme" style={{ fontSize: 15 }}/>重置offset
          </li>
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Group" key="1">
            {this.renderConsumer()}
          </TabPane>
        </Tabs>
      </>
    );
  }
}
