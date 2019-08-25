import * as React from 'react';

import './index.less';
import { Tooltip } from 'component/antd';
import { adminMenu, userMenu, getActiveMenu } from './constant';

interface ILeftMenuProps {
  page: string;
  mode?: 'admin' | 'user';
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
    const menu = mode === 'admin' ? adminMenu : userMenu;
    return (
      <div className={`left-menu ${status}`}>
        <ul>
        {
          menu.map((m, i) => {
            const active = getActiveMenu(mode, page);
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
