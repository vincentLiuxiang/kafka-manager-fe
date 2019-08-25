import * as React from 'react';

import { Table, Tabs, Select, Input } from 'component/antd';
import { PaginationConfig } from 'antd/es/table/interface';
import { modal } from 'store';
import { UserHome } from 'container/user-home';
import { topic } from 'store/topic';
import { cluster } from 'store/cluster';

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

export class AdminTopic extends UserHome {
  public cols = [
    {
      title: '名称',
      dataIndex: 'topicName',
      key: 'topicName',
    },
    {
      title: '分区数',
      dataIndex: 'partitionNum',
      key: 'partitionNum',
    },
    {
      title: 'broker覆盖数',
      dataIndex: 'broker',
      key: 'broker',
    },
    {
      title: '字节输入\n(K/s)',
      dataIndex: 'byteIn',
      key: 'byteIn',
    },
    {
      title: '字节输出\n(K/s)',
      dataIndex: 'byteOut',
      key: 'byteOut',
    },
    {
      title: '消息',
      dataIndex: 'messageIn',
      key: 'messageIn',
    },
    {
      title: '负责人',
      dataIndex: 'principals',
      key: 'principals',
    },
    {
      title: '集群',
      dataIndex: 'clusterName',
      key: 'clusterName',
    },
  ];
  public renderTable() {
    const { searchKey } = this.state;
    let topics = searchKey ? topic.data.filter((d) => d.topicName.includes(searchKey)) : topic.data;

    if (cluster.active !== -1) {
      topics = topics.filter((t) => t.clusterId === cluster.active);
    }

    return (
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane tab="Topic列表">
          <Table pagination={pagination} columns={this.cols} dataSource={topics} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
