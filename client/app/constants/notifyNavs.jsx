import { notifyPath } from 'lib/paths';

export default {
  navs: [
    { name: '訂單狀態',
      href: notifyPath.contractNotifyPath,
      tabName: 'CONTRACT' },
    { name: '即時資訊',
      href: notifyPath.itemNotifyPath,
      tabName: 'ITEM' },
    { name: '活動快報',
      href: notifyPath.activityNotifyPath,
      tabName: 'ACTIVITY' },
    { name: '系統通知',
      href: notifyPath.systemNotifyPath,
      tabName: 'SYSTEM' },
  ],
};
