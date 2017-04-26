import {
  ID_COVER,
  ID_ABOUT,
  ID_DELIVERY,
  ID_PRICE,
  ID_REGULATION,
  ID_CANCEL_POLICY,
  ID_CONFIRM,
} from '../constant';

const navsMapper = [
  {
    text: '上傳照片',
    labelFor: ID_COVER,
  },
  {
    text: '關於物品',
    labelFor: ID_ABOUT,
  },
  {
    text: '寄件資訊',
    labelFor: ID_DELIVERY,
  },
  {
    text: '設定價格',
    labelFor: ID_PRICE,
  },
  {
    text: '建立分享人守則',
    labelFor: ID_REGULATION,
  },
  {
    text: '建立退訂政策',
    labelFor: ID_CANCEL_POLICY,
  },
  {
    text: '確認發佈資訊',
    labelFor: ID_CONFIRM,
  },
];
export default navsMapper;
