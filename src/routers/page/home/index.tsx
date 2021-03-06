import * as React from 'react';

import 'component/antd';
import './index.less';
import { Header } from 'container/header';
import { LeftMenu } from 'container/left-menu';
import { UserHome } from 'container/user-home';
import { TopicDetail } from 'container/topic-detail';
import AllModalInOne from 'container/modal';
import { MyOrder } from 'container/my-order';
import { Alarm } from 'container/alarm';
import { Consumer } from 'container/consumer';

export default class Home extends React.Component<any> {
  public renderUserHomePage() {
    return <UserHome />;
  }

  public renderTopicDetail() {
    return <TopicDetail />;
  }

  public renderMyOrder() {
    return <MyOrder />;
  }

  public renderAlarm() {
    return <Alarm />;
  }

  public renderConsumer() {
    return <Consumer />;
  }

  public render() {
    const { match } = this.props;
    const page = match.params.page;
    return (
      <>
        <Header active="user"/>
        <div className="core-container">
          <LeftMenu page={page} />
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
    if (page === 'consumer') return this.renderConsumer();
    if (page === 'my_order') return this.renderMyOrder();
    if (page === 'alarm') return this.renderAlarm();
    return this.renderUserHomePage();
  }
}
