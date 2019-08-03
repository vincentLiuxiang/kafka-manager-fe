import * as React from 'react';

import './index.less';
import { Tooltip } from 'component/antd';

interface ILeftMenuProps {
  page: string;
  mode?: string;
}

const userMenu = [{
  href: '/',
  i: 'k-icon-iconfontzhizuobiaozhun023110',
  title: 'Topic 列表',
}, {
  href: '/user/my_order',
  i: 'k-icon-order1',
  title: '工单列表',
}, {
  href: '/user/alarm',
  i: 'k-icon-gaojing',
  title: '告警配置',
}, {
  href: '/user/consumer',
  i: 'k-icon-xiaofeikecheng',
  title: '消费组列表',
}];

function getActiveMenu(page: string) {
  if (!page) return 0;
  if (page === 'topic_detail') return 0;
  if (page === 'my_order') return 1;
  if (page === 'alarm') return 2;
  if (page === 'consumer') return 3;
}

export class LeftMenu extends React.Component<ILeftMenuProps> {
  public state = {
    status: '',
  };

  public open = () => {
    const { status } = this.state;
    const newStatus = !status ? 'k-open' : '';
    this.setState({
      status: newStatus,
    });
  }

  public render() {
    const { status } = this.state;
    const { page, mode } = this.props;
    const menu = mode === 'admin' ? userMenu : userMenu;
    return (
      <div className={`left-menu ${status}`}>
        <ul>
        {
          menu.map((m, i) => {
            const active = getActiveMenu(page);
            const cnt = (
              <li className={`${active === i ? 'active' : ''}`} key={m.i}>
                <a href={m.href} target="_blank">
                  <i className={m.i} />
                  {status ? <span>{m.title}</span> : null}
                </a>
              </li>
            );

            if (!status) {
              return <Tooltip placement="right" title={m.title}  key={m.i} >{cnt}</Tooltip>;
            }
            return cnt;
          })
        }
        </ul>
        <div className="k-float-op" onClick={this.open}>
          <i className={status ? 'k-icon-baseline-close-px' : 'k-icon-menu2'} />
        </div>
      </div>
    );
  }
}
