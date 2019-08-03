import * as React from 'react';
import { Tabs } from 'component/antd';
import { BrokerBaseDetail } from './base-detail';
import { TopicAnalysis } from './topic-analysis';

const TabPane = Tabs.TabPane;

export class BrokerDetail extends React.Component {
  public render() {
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Broker基本信息" key="1">
          <BrokerBaseDetail />
        </TabPane>
        <TabPane tab="Topic信息" key="2">
        </TabPane>
        <TabPane tab="Partition信息" key="3">
        </TabPane>
        <TabPane tab="状态图" key="4">
        </TabPane>
        <TabPane tab="Topic分析" key="5">
          <TopicAnalysis />
        </TabPane>
        <TabPane tab="Broker关键指标" key="6">
        </TabPane>
      </Tabs>
    );
  }
}
