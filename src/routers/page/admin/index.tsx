import * as React from 'react';

import 'component/antd';
import { Header } from 'container/header';
import { LeftMenu } from 'container/left-menu';
import AllModalInOne from 'container/modal';
import { TopicDetail } from 'container/topic-detail';
import { BrokerDetail } from 'container/broker-detail';
import { AdminHome } from 'container/admin-home';
import { AdminTopic } from 'container/admin-topic';

export default class Home extends React.Component<any> {
  public renderTopicDetail() {
    return <TopicDetail />;
  }

  public renderBrokerDetail() {
    return <BrokerDetail />;
  }

  public renderAdminHomePage() {
    return <AdminHome />;
  }

  public renderTopic() {
    return <AdminTopic />;
  }

  public render() {
    const { match } = this.props;
    const page = match.params.page;
    return (
      <>
        <Header active="admin"/>
        <div className="core-container">
          <LeftMenu page={page} mode="admin" />
          <div className="content-container">
            {this.runner(page)}
          </div>
        </div>
        <AllModalInOne />
      </>
    );
  }

  private runner(page: string) {
    if (page === 'topic_detail') return this.renderTopicDetail();
    if (page === 'broker_detail') return this.renderBrokerDetail();
    if (page === 'topic') return this.renderTopic();
    return this.renderAdminHomePage();
  }
}
