import * as React from 'react';
import { Table } from 'component/antd';
import { TopicDetail } from 'container/topic-detail';
import { NetWorkFlow } from 'container/topic-detail/com';

export class TopicAnalysis extends TopicDetail {
  public render() {
    return (
      <>
        <div className="k-row right-flow mb-24">
          <p className="k-title">Broker 状态</p>
          <BrokerStatus />
        </div>
        <div className="k-row right-flow">
          <p className="k-title">Topic 状态</p>
          <span className="k-abs didi-theme" style={{ fontSize: '14px' }}>说明：数值后的百分比表示“占Broker总量的百分比”</span>
          <NetWorkFlow />
        </div>
      </>
    );
  }
}

class BrokerStatus extends React.Component {
  public render() {
    return (
      <div className="k-summary">
        <div className="k-row-3">
          <div>
            <span>Broker ID</span>
            <p>234</p>
          </div>
          <div>
            <span>Bytes In（M/ 秒）</span>
            <p>163.54</p>
          </div>
          <div>
            <span>Bytes Out（M/ 秒）</span>
            <p>567.60</p>
          </div>
          <div>
            <span>Messages In（秒）</span>
            <p>54272.51</p>
          </div>
          <div>
            <span>Total Fetch Requests（秒）</span>
            <p>167534.24</p>
          </div>
          <div>
            <span>Total Produce Requests（秒）</span>
            <p>167534.24</p>
          </div>
        </div>
      </div>
    );
  }
}