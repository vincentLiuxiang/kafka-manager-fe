import { configure } from 'mobx';
configure({ enforceActions: 'observed' });

export { modal } from './modal';
