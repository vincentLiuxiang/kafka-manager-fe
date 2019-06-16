import { configure } from 'mobx';
configure({ enforceActions: 'observed' });

export { counter } from './counter';
export { baseInfo } from './base-info';
