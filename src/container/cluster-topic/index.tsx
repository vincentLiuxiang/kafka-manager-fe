import * as React from 'react';
import { Select, Input } from 'component/antd';
import { cluster } from 'store/cluster';

const Option = Select.Option;
const Search = Input.Search;

export class ClusterTopic extends React.Component {
  public renderClusterTopic() {
    return (
      <>
        <li>
          <Select value={cluster.active} onChange={cluster.changeCluster}>
            {cluster.data.map((d) => <Option value={d.clusterId} key={d.clusterId}>{d.clusterName}</Option>)}
          </Select>
        </li>
        <li><Search placeholder="请输入Topic名称" onChange={this.onSearchChange} /></li>
      </>
    );
  }

  public onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.trim();
    this.setState({
      searchKey,
    });
  }
}
