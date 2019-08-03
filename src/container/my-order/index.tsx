import * as React from 'react';

import { Table, Tabs, Select, Input } from 'component/antd';
import { PaginationConfig } from 'antd/es/table/interface';
import { modal } from 'store';
import { observer } from 'mobx-react';
import { order, IBaseOrder, IPartitionOrder } from 'store/order';
import { cluster } from 'store/cluster';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;

const Columns = [
  {
    title: '工单 ID',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: 'Topic 名称',
    dataIndex: 'topicName',
    key: 'topicName',
  },
  {
    title: '工单入口',
    dataIndex: 'input',
    key: 'input',
  },
  {
    title: '业务负责人',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: '审批人',
    dataIndex: 'approver',
    key: 'approver',
  },
  {
    title: '申请时间',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
  },
  {
    title: '工单状态',
    dataIndex: 'statusStr',
    key: 'statusStr',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text: string, r: IBaseOrder) => {
      return (
        <span className="table-operation">
          <a onClick={modal.showNewTopic}>详情</a>
          {r.orderStatus === 0 ? <a >撤回</a> : null}
        </span>
      );
    },
  },
];

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

@observer
export class MyOrder extends React.Component {
  public state = {
    searchKey: '',
  };

  public componentDidMount() {
    order.getOrder();
    cluster.getClusters();
  }

  public renderTopic() {
    return (
      <Table
        columns={Columns}
        dataSource={this.getData(order.topicOrder)}
        pagination={pagination}
      />
    );
  }

  public renderPartition() {
    return (
      <Table
        columns={Columns}
        dataSource={this.getData(order.partitionOrder)}
        pagination={pagination}
      />
    );
  }

  public getData<T extends IBaseOrder>(origin: T[]) {
    let data: T[] = [];
    origin.forEach((d) => {
      if (cluster.active === -1 || d.clusterId === cluster.active) {
        return data.push(d);
      }
    });
    const { searchKey } = this.state;

    if (searchKey) {
      data = data.filter((d) => d.topicName.includes(searchKey));
    }

    return data;
  }

  public render() {
    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic" onClick={modal.showNewTopic}>
            <i className="k-icon-xinjian didi-theme"/>新建Topic
          </li>
          <li>
            <Select value={cluster.active} onChange={cluster.changeCluster}>
              {cluster.data.map((d) => <Option value={d.clusterId} key={d.clusterId}>{d.clusterName}</Option>)}
            </Select>
          </li>
          <li><Search placeholder="请输入Topic名称" onChange={this.onSearchChange} /></li>
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Topic 申请" key="1">
            {this.renderTopic()}
          </TabPane>
          <TabPane tab="Topic 扩容" key="2">
            {this.renderPartition()}
          </TabPane>
        </Tabs>
      </>
    );
  }

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.trim();
    this.setState({
      searchKey,
    });
  }
}
