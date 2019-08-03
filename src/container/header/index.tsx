import * as React from 'react';

import './index.less';

interface IHeader {
  active: string;
}

export const Header = (props: IHeader) => {
  const { active } = props;
  return (
    <div className="kafka-header-container">
      <div className="left-content">
        <span className="kafka-header-icon" />
        <span className="kafka-header-text">Antd test </span>
      </div>
      <div className="mid-content">
        <span className={active === 'user' ? 'k-active' : ''}><a href="/">集群监控</a></span>
        <span className={active === 'admin' ? 'k-active' : ''}><a href="/admin">集群管控</a></span>
      </div>
      <div className="right-content">
        <span className="kafka-header-icon" />
        <span className="kafka-header-text">管理员：test</span>
      </div>
    </div>
  );
};
