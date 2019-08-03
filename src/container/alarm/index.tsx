import * as React from 'react';

import { Table, Tabs, Select, Input } from 'component/antd';
import { PaginationConfig } from 'antd/es/table/interface';
import { modal } from 'store';
import { observer } from 'mobx-react';
import { alarm, IAlarm } from 'store/alarm';

const TabPane = Tabs.TabPane;
const Search = Input.Search;

const columns = [
  {
    title: '配置名称',
    dataIndex: 'alarmName',
    key: 'alarmName',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    render: (text: string, record: IAlarm) => {
      return (
        <span className="table-operation">
          <a onClick={modal.showAlarm.bind(null, record)}>详情</a>
          <a >删除</a>
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
export class Alarm extends React.Component {
  public componentDidMount() {
    alarm.getAlarm();
  }

  public renderAlarm() {
    if (!alarm.data) return null;
    return (
      <Table
        columns={columns}
        dataSource={alarm.data}
        pagination={pagination}
      />
    );
  }

  public render() {
    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic" onClick={modal.showAlarm.bind(null, {})}>
            <i className="k-icon-xinjian didi-theme"/>添加告警配置
          </li>
          <li><Search placeholder="请输入关键字" enterButton="搜索"/></li>
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="告警列表" key="1">
            {this.renderAlarm()}
          </TabPane>
        </Tabs>
      </>
    );
  }
}
