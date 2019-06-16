import { notification } from 'antd';
import { getCookie } from './utils';
const window = self.window;

export interface IRes {
  requestId: string;
  resultCode: string;
  returnMsg: string;
  data: any;
}

const filter = (init: IInit) => (res: IRes) => {
  if (res.resultCode === '401') {
    let url = res.data;

    if (!/^http(s)?:\/\//.test(url)) {
      url = `${window.location.protocol}//${url}`;
    }

    window.location.href = `${url}&jumpto=${encodeURIComponent(window.location.href)}`;
    return null;
  }

  if (res.resultCode !== '0') {
    if (!init.errorNoTips) {
      notification.error({
        message: '错误',
        description: res.returnMsg || '服务器错误，请重试！',
      });
    }
    throw res;
  }

  return res.data;
};

const preFix = '/api/v1.0/ds';

interface IInit extends RequestInit {
  errorNoTips?: boolean;
}

const csrfTokenMethod = ['POST', 'PUT', 'DELETE'];

export default function fetch(url: string, init?: IInit) {
  if (!init) init = {};

  if (!init.credentials) init.credentials = 'include';
  if (init.body && typeof init.body === 'object') init.body = JSON.stringify(init.body);
  if (init.body && !init.method) init.method = 'POST';
  if (init.method) init.method = init.method.toUpperCase();

  if (csrfTokenMethod.includes(init.method)) {
    init.headers = Object.assign({}, init.headers || {
      'HEADER-CSRF': getCookie('datadream_ticket'),
    });
  }

  let realUrl = url;
  if (!/^http(s)?:\/\//.test(url)) {
    realUrl = `${preFix}${url}`;
  }
  return window
    .fetch(realUrl, init)
    .then((res) => res.json())
    .then(filter(init));
}
