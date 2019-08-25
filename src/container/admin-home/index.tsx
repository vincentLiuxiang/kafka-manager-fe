import * as React from 'react';
import './index.less';

import { Table, Tabs, Select, Input } from 'component/antd';
import { PaginationConfig } from 'antd/es/table/interface';
import { modal } from 'store';
import { cluster } from 'store/cluster';
import { observer } from 'mobx-react';
import { topic } from 'store/topic';

const TabPane = Tabs.TabPane;

const collectionColumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '集群名',
    dataIndex: 'cluster_name',
    key: 'cluster_name',
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
  },
  {
    title: 'Broker',
    dataIndex: 'broker',
    key: 'broker',
  },
  {
    title: 'Consume',
    dataIndex: 'consume',
    key: 'consume',
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'ControllerId',
    dataIndex: 'controller_id',
    key: 'controller_id',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text: string, record: any) => {
      return (
        <span className="table-operation">
          <a onClick={modal.showModifyCluster}>修改</a>
        </span>
      );
    },
  },
];

const dataSource = [{
  cluster_name: 'Test001',
  id: 100,
  topic: 2000,
  region: 1999,
  broker: 100,
  controller_id: 99,
  consume: 200,
  key: 0,
}, {
  cluster_name: 'Test001',
  id: 101,
  topic: 200,
  region: 199,
  broker: 1200,
  controller_id: 919,
  consume: 210,
  key: 1,
}];

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

@observer
export class AdminHome extends React.Component {
  public state = {
    searchKey: '',
  };

  public renderList() {
    return (
      <Table
        columns={collectionColumns}
        dataSource={dataSource}
        pagination={pagination}
      />
    );
  }

  public componentDidMount() {
    cluster.getClusters();
    topic.getTopics();
  }

  public render() {
    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic" onClick={modal.showNewCluster}>
            <i className="k-icon-xinjian didi-theme"/>添加集群
          </li>
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="集群列表" key="1">
            {this.renderList()}
          </TabPane>
        </Tabs>
      </>
    );
  }
}
