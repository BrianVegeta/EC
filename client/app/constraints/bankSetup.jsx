/**
 *
 * @realName
 * @identityNo
 * @accBankId
 * @accBankBranchId
 * @accName
 * @accNo
 *
 */
export default {
  // 真實姓名
  realName: {
    length: {
      maximum: 10,
      message: '^請填"真實"姓名',
      minimum: 2,
    },
  },
  phone: {
    presence: {
      message: '^請設定手機號碼',
    },
  },
  email: {
    presence: {
      message: '^請設定電子信箱',
    },
  },
  // 身分證字號或統編
  idNumber: {
    presence: {
      message: '^請填身分證字號或統編',
    },
    length: {
      minimum: 8,
      maximum: 10,
      message: '^請填身分證字號或統編',
    },
  },
  // 銀行選擇
  accBankId: {
    presence: {
      message: '^請選擇銀行',
    },
  },
  // 選擇分行
  accBankBranchId: {
    presence: {
      message: '^請選擇分行',
    },
  },
  // 戶名或公司名稱
  accName: {
    presence: {
      message: '^請填戶名或公司名稱',
    },
    format: {
      pattern: '[\u4e00-\u9fa5_a-zA-Z0-9 ]{0,50}$',
      flags: 'i',
      message: '^格式不正確',
    },
  },
  // 銀行帳號
  accNo: {
    length: {
      maximum: 16,
      minimum: 10,
      message: '^銀行帳號不正確',
    },
    presence: {
      message: '^請填銀行帳號',
    },
  },
};
