export const userMenu = [{
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

export const adminMenu = [{
  href: '/admin',
  i: 'k-icon-jiqun',
  title: '集群',
}, {
  href: '/user/my_order',
  i: 'k-icon-order1',
  title: '工单列表',
}, {
  href: '/user/my_order',
  i: 'k-icon-renwuliebiao',
  title: '任务列表',
}, {
  href: '/user/alarm',
  i: 'k-icon-gaojing',
  title: '告警配置',
}, {
  href: '/user/my_order',
  i: 'k-icon-yonghuguanli',
  title: '用户管理',
}, {
  href: '/user/my_order',
  i: 'k-icon-shenpi1',
  title: '自动审批管理',
}, {
  href: '/user/consumer',
  i: 'k-icon-xiaofeikecheng',
  title: '消费组',
}];

export const userMap = {
  topic_detail: 0,
  my_order: 1,
  alarm: 2,
  consumer: 3,
} as {
  [key: string]: number;
};

export const adminMap = {

} as {
  [key: string]: number;
};

export const getActiveMenu = (mode: 'admin' | 'user', page: string) => {
  const map = mode === 'admin' ? adminMap : userMap;
  return map[page] || 0;
};
