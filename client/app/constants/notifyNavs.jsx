import { notifyPath } from 'lib/paths';

export default {
  navs: [
    { name: '訂單更新',
      href: notifyPath.contractNotifyPath,
      tabName: 'CONTRACT' },
    { name: '即時通知',
      href: notifyPath.itemNotifyPath,
      tabName: 'ITEM' },
    { name: '活動通知',
      href: notifyPath.activityNotifyPath,
      tabName: 'ACTIVITY' },
    { name: '系統通知',
      href: notifyPath.systemNotifyPath,
      tabName: 'SYSTEM' },
  ],
};
