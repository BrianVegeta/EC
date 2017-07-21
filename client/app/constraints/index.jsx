import bankSetup from './bankSetup';

export default {
  email: {
    email: {
      message: '^請填正確的 Email',
    },
  },
  password: {
    length: {
      maximum: 12,
      tooLong: '^請短於%{count}個英數字',
      minimum: 8,
      tooShort: '^請長於%{count}個英數字',
    },
  },
  identityNo: {
    
  },
  verifyCode: {
    length: {
      is: 4,
      wrongLength: '^請輸入正確的驗證碼（4位數）',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請輸入正確的驗證碼（4位數）',
      notValid: '^請輸入正確的驗證碼（4位數）',
    },
  },
  phone: {
    format: {
      pattern: '^09[0-9]{8}$',
      flags: 'i',
      message: '^請輸入手機號碼',
    },
  },
  ...bankSetup,
};
