import * as React from 'react';
import { TopicDetail } from 'container/topic-detail';
import './index.less';
import { NetWorkFlow } from 'container/topic-detail/com';

export class BrokerBaseDetail extends TopicDetail {
  public render() {
    return (
      <>
        <div className="k-row right-flow mb-24">
          <p className="k-title">概述</p>
          <Summary />
        </div>
        <div className="k-row right-flow">
          <p className="k-title">状态信息</p>
          <span className="k-abs"><i className="k-icon-xinjian didi-theme"/>刷新</span>
          <NetWorkFlow />
        </div>
      </>
    );
  }
}

class Summary extends React.Component {
  public render() {
    return (
      <div className="k-summary">
        <div className="k-row-1">
          <div>主机：bigdata-swan-ser126.ys.diditaxi.com</div>
          <div>启动时间：2019-05-13 15:27:08</div>
        </div>
        <div className="k-row-2">
          <div>
            <span>消息数占比</span>
            <p>25%</p>
          </div>
          <div>
            <span>bitten占比</span>
            <p>25%</p>
          </div>
          <div>
            <span>byte out占比</span>
            <p>25%</p>
          </div>
        </div>
        <div className="k-row-3">
          <div>
            <span>Topic数</span>
            <p>25</p>
          </div>
          <div>
            <span>分区数</span>
            <p>25</p>
          </div>
          <div>
            <span>分区Leader</span>
            <p>25</p>
          </div>
          <div>
            <span>Port</span>
            <p>25</p>
          </div>
          <div>
            <span>JMX Port</span>
            <p>25</p>
          </div>
        </div>
      </div>
    );
  }
}
