import * as React from 'react';
import { observer } from 'mobx-react';
import { modal } from 'store/modal';
import TopicNew from './topic-new';
import TopicExpand from './topic-expand';
import Alarm from './alarm-config';
import ResetOffset from './reset-offset';
import ClusterNew from './cluster';

import './index.less';

@observer
export default class AllModalInOne extends React.Component {
  public render() {
    if (!modal.id) return null;
    return (
      <>
        {modal.id === 'showNewTopic' ? <TopicNew /> : null}
        {modal.id === 'showNewCluster' ? <ClusterNew /> : null}
        {modal.id === 'showModifyCluster' ? <ClusterNew /> : null}
        {modal.id === 'showModifyTopic' ? <TopicNew /> : null}
        {modal.id === 'showExpandTopic' ? <TopicExpand /> : null}
        {modal.id === 'showAlarm' ? <Alarm /> : null}
        {modal.id === 'showResetOffset' ? <ResetOffset /> : null}
      </>
    );
  }
}
