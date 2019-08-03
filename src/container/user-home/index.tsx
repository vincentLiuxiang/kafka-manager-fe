import * as React from 'react';
import './index.less';

import { Table, Tabs, Select, Input, Alert, message, PaginationConfig } from 'component/antd';
import { modal } from 'store';
import { cluster } from 'store/cluster';
import { observer } from 'mobx-react';
import { topic, ITopic } from 'store/topic';
import ReactDOM from 'react-dom';
import { collect, uncollect } from 'lib/api';
import { ClusterTopic } from 'container/cluster-topic';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 10,
};

@observer
export class UserHome extends ClusterTopic {
  public state = {
    searchKey: '',
  };

  public collRef: HTMLDivElement = null;
  public uncollRef: HTMLDivElement = null;

  public collectionColumns = [
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
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
  ];

  public rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: ITopic[]) => {
      const num = selectedRows.length;
      if (selectedRows.length) {
        ReactDOM.render(
          <>
            <Alert
              type="warning"
              message={`已选择 ${num} 项 `}
              showIcon={true}
              closable={false}
            />
            <a className="k-coll-btn didi-theme" onClick={this.collect.bind(this, selectedRows)}>全部收藏</a>
          </>,
          this.collRef,
        );
      }
    },
  };

  public unrowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: ITopic[]) => {
      const num = selectedRows.length;
      if (selectedRows.length) {
        ReactDOM.render(
          <>
            <Alert
              type="warning"
              message={`已选择 ${num} 项 `}
              showIcon={true}
              closable={false}
            />
            <a className="k-coll-btn didi-theme" onClick={this.uncollect.bind(this, selectedRows)}>全部取消收藏</a>
          </>,
          this.uncollRef,
        );
      }
    },
  };

  public getCol(collOrUncoll: string, clickHandler: (r: ITopic[]) => any) {
    return {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: string, r: ITopic) => {
        return (
          <span className="table-operation">
            <a onClick={clickHandler.bind(this, [r])}>{collOrUncoll}</a>
            <a onClick={modal.showExpandTopic}>扩容</a>
            <a href={`/user/topic_detail?topic=${r.topicName}&clusterId=${r.clusterId}`} target="_blank">详情</a>
          </span>
        );
      },
    };
  }

  public renderCollection(favData: ITopic[]) {
    const col = this.collectionColumns.concat([this.getCol('取消收藏', this.uncollect)]);
    return (
      <Table
        rowSelection={this.unrowSelection}
        dataSource={favData}
        columns={col}
        pagination={pagination}
      />
    );
  }

  public renderList(data: ITopic[]) {
    const col = this.collectionColumns.concat([this.getCol('收藏', this.collect)]);
    return (
      <Table
        rowSelection={this.rowSelection}
        columns={col}
        dataSource={data}
        pagination={pagination}
      />
    );
  }

  public componentDidMount() {
    if (cluster.data.length === 0) {
      cluster.getClusters();
    }

    if (topic.data.length === 0) {
      topic.getTopics();
    }
  }

  public collect = (selectedRowKeys: ITopic[]) => {
    collect(selectedRowKeys.map(s => ({ clusterId: s.clusterId, topicName: s.topicName }))).then(() => {
      this.collRef.innerHTML = '';
      message.success('收藏成功');
      topic.getTopics();
    });
  }

  public uncollect = (selectedRowKeys: ITopic[]) => {
    uncollect(selectedRowKeys.map(s => ({ clusterId: s.clusterId, topicName: s.topicName }))).then(() => {
      this.uncollRef.innerHTML = '';
      message.success('取消收藏成功');
      topic.getTopics();
    });
  }

  public render() {
    let collectData: ITopic[] = [];
    let favData: ITopic[] = [];
    topic.data.forEach((d) => {
      if (cluster.active === -1 || d.clusterId === cluster.active) {
        const t = { ...d, key: d.topicName };
        if (!d.favorite) return collectData.push(t);
        favData.push(t);
      }
    });
    const { searchKey } = this.state;
    if (searchKey) {
      collectData = collectData.filter((d) => d.topicName.includes(searchKey));
      favData = favData.filter((d) => d.topicName.includes(searchKey));
    }

    return (
      <>
        <ul className="table-operation-bar">
          <li className="new-topic" onClick={modal.showNewTopic}>
            <i className="k-icon-xinjian didi-theme"/>新建Topic
          </li>
          {this.renderClusterTopic()}
        </ul>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Topic收藏" key="1">
            {this.renderCollection(favData)}
            <div className="k-collect" ref={(id) => this.uncollRef = id} />
          </TabPane>
          <TabPane tab="Topic列表" key="2">
            {this.renderList(collectData)}
            <div className="k-collect" ref={(id) => this.collRef = id} />
          </TabPane>
        </Tabs>
      </>
    );
  }
}
