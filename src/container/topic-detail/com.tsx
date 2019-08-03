import * as React from 'react';
import { Table, DatePicker, Select, Button, Input, PaginationConfig } from 'component/antd';
import echarts from 'echarts/lib/echarts';

// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { observer } from 'mobx-react';
import { topic, ITopicConsumeInfo } from 'store/topic';

export const Base = observer(() => {
  if (!topic.baseInfo) return null;
  return (
    <ul className="base-detail">
      <li className="base-total">
        <div><span>分区数</span><span><b>{topic.baseInfo.partitionNum}</b></span></div>
        <div><span>副本数</span><span><b>{topic.baseInfo.replicaNum}</b></span></div>
      </li>
      <li>负责人：{topic.baseInfo.principals}</li>
      <li>储存时间：{topic.baseInfo.retentionTime}</li>
      <li>创建时间：{topic.baseInfo.createTime}</li>
      <li>修改时间：{topic.baseInfo.modifyTime}</li>
    </ul>
  );
});

const groupColumns = [{
  title: '消费组',
  dataIndex: 'consumerGroup',
  key: 'consumerGroup',
}, {
  title: 'location',
  dataIndex: 'location',
  key: 'location',
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render: (text: string, record: ITopicConsumeInfo) => {
    return (
      <span className="table-operation">
        <a
          // tslint:disable-next-line:max-line-length
          href={`/user/consumer?topicName=${topic.currentTopicName}&clusterId=${topic.currentClusterId}&group=${record.consumerGroup}&location=${record.location}`}
          target="_blank"
        >
          查看消费详情
        </a>
      </span>
    );
  },
}];

const pagination: PaginationConfig = {
  position: 'bottom',
  showQuickJumper: true,
  pageSize: 4,
};

export const Group = observer(() => {
  return (
    <div className="group-detail">
      <Table columns={groupColumns} dataSource={topic.consumeInfo} pagination={pagination}/>
    </div>
  );
});

const flowColumns = [{
  title: '名称',
  dataIndex: 'key',
  key: 'name',
},
{
  title: '平均数',
  dataIndex: 'avr',
  key: 'partition_num',
},
{
  title: '前1分钟',
  dataIndex: 'pre1',
  key: 'byte_input',
},
{
  title: '前5分钟',
  dataIndex: 'pre5',
  key: 'byte_output',
},
{
  title: '前15分钟',
  dataIndex: 'pre15',
  key: 'message',
}];

export const StatusGragh = observer(() => {
  if (!topic.statusInfo) return null;
  const data: any[] = [];
  Object.keys(topic.statusInfo).map((key) => {
    const v = topic.statusInfo[key] || [];
    const obj = {
      key,
      avr: v[0],
      pre1: v[1],
      pre5: v[2],
      pre15: v[3],
    };
    data.push(obj);
  });
  return (
    <Table columns={flowColumns} dataSource={data} pagination={false}/>
  );
});

export class NetWorkFlow extends React.Component {
  public id: HTMLDivElement = null;
  public componentDidMount() {
    const myChart = echarts.init(this.id);
    myChart.setOption({
      tooltip: {},
      xAxis: {
        boundaryGap: false,
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      legend: {
        data: ['销量1', '销量2'],
        right: '1%',
        top: '10px',
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        top: '40px',
        containLabel: true,
      },
      yAxis: {},
      series: [{
        name: '销量1',
        type: 'line',
        data: [51, 20, 34, 12, 13, 28],
      }, {
        name: '销量2',
        type: 'line',
        data: [53, 20, 36, 10, 10, 20],
      }],
    });
  }

  public render() {
    return (
      <>
        <div className="status-graph">
          <ul className="k-toolbar topic-line-tool">
            <li><span className="label">开始时间</span><DatePicker /></li>
            <li><span className="label">结束时间</span><DatePicker /></li>
            <li><span className="label">类型</span><Select style={{ width: '160px' }}/></li>
            <li><Button type="primary" size="small">查询</Button></li>
            {/* <li><Button type="primary" size="small">配额信息</Button></li> */}
          </ul>
        </div>
        <div style={{ height: 400 }} ref={(id) => this.id = id}/>
      </>
    );
  }
}
