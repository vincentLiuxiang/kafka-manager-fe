import { inject, observer } from 'mobx-react';

import { counter } from 'store';
import * as React from 'react';
import { message, Input } from 'component/antd';
import './index.less';

const antdDemo = () => {
  message.success('success');
};

/**
 * good practice
 */
export default observer(() => {
  return (
    <div>
      <p>{counter.count}</p>
      <button onClick={counter.add}>加1</button>
      <button onClick={counter.minus}>减1</button>
      <button onClick={antdDemo}>antd</button>
      <Input />
    </div>
  );
});

/**
 * bad practice
 */
// interface ICounterProps {
//   count: number;
//   add: () => void;
//   minus: () => void;
// }

// export default inject('counter')(observer((props: any) => {
//   const counter = props.counter as ICounterProps;
//   return (
//     <div>
//       <p>{counter.count}</p>
//       <button onClick={counter.add}>加1</button>
//       <button onClick={counter.minus}>减1</button>
//     </div>
//   );
// }));
