
export default {
  // 真實姓名
  realName: {
    length: {
      maximum: 10,
      message: '^請填"真實"姓名',
      minimum: 2,
    },
  },
  // 身分證字號或統編
  identityNo: {
    presence: {
      message: '請填身分證字號或統編',
    },
  },
  // 銀行選擇
  accBankId: {
    presence: {
      message: '請選擇銀行',
    },
  },
  // 選擇分行
  accBankBranchId: {
    presence: {
      message: '請選擇分行',
    },
  },
  // 戶名或公司名稱
  accName: {
    presence: {
      message: '請填戶名或公司名稱',
    },
  },
  // 銀行帳號
  accNo: {
    presence: {
      message: '請填銀行帳號',
    },
  },
};
