import * as React from 'react';

import { Table, Tabs, Select, Input } from 'component/antd';
import { PaginationConfig } from 'antd/es/table/interface';
import { modal } from 'store';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;

const collectionColumns = [
  {
    title: 'Topic名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分区数',
    dataIndex: 'partition_num',
    key: 'partition_num',
  },
  {
    title: 'Broker覆盖数',
    dataIndex: 'broker_num',
    key: 'broker_num',
  },
  {
    title: '字节输入\n(K/s)',
    dataIndex: 'byte_input',
    key: 'byte_input',
  },
  {
    title: '字节输出\n(K/s)',
    dataIndex: 'byte_output',
    key: 'byte_output',
  },
  {
    title: '消息',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: '所属region',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: '负责人',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '保留时间',
    dataIndex: 'keep_time',
    key: 'keep_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text: string, record: any) => {
      return (
        <span className="table-operation">
          <a href="javascript:;">详情</a>
          <a>编辑</a>
          <a onClick={modal.showExpandTopic}>扩分区</a>
          <a href="/topic_detail" target="_blank">采样</a>
          <a href="/topic_detail" target="_blank">删除</a>
        </span>
      );
    },
  },
];

const dataSource = [{
  name: 'Test001',
  partition_num: 100,
  byte_input: 2000,
  byte_output: 1999,
  message: 100,
  owner: '张亮1',
  keep_time: '2018-10-10',
  key: 0,
}, {
  name: 'Test002',
  partition_num: 100,
  byte_input: 2000,
  byte_output: 1999,
  message: 100,
  owner: '张亮2',
  keep_time: '2018-10-10',
  key: 1,
}];

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

export class AdminTopic extends React.Component {

  public renderList() {
    return (
      <Table
        columns={collectionColumns}
        dataSource={dataSource}
        pagination={pagination}
      />
    );
  }

  public render() {
    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic" onClick={modal.showNewTopic}>
            <i className="k-icon-xinjian didi-theme"/>新建Topic
          </li>
          <li>
            <Select value="all">
              <Option value="all">所有集群</Option>
            </Select>
          </li>
          <li><Search placeholder="请输入Topic名称" enterButton="搜索"/></li>
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Topic列表" key="1">
            {this.renderList()}
          </TabPane>
        </Tabs>
      </>
    );
  }
}
