export interface IMap {
  [index: string]: string;
}

export const getCookie = (key: string): string => {
  const map: IMap = {};
  document.cookie.split(';').map((kv) => {
    const d = kv.trim().split('=');
    map[d[0]] = d[1];
    return null;
  });
  return map[key];
};

export const uuid = (): string => {
  return 'c' + `${Math.random()}`.slice(2);
};
