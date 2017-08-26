
export const phone = {
  format: {
    pattern: '^09[0-9]{8}$',
    flags: 'i',
    message: '^請輸入手機號碼',
  },
};

export const email = {
  email: {
    message: '^請填正確的 Email',
  },
};

export const password = {
  length: {
    maximum: 12,
    tooLong: '^請短於%{count}個英數字',
    minimum: 8,
    tooShort: '^請長於%{count}個英數字',
  },
};

export const passwordConfirmation = {
  equality: {
    attribute: 'password',
    message: '^確認密碼不符',
  },
};

export const nickname = {
  presence: {
    message: '^請設定暱稱',
  },
};

export default {
  phone,
  email,
  password,
  passwordConfirmation,
  nickname,
};
