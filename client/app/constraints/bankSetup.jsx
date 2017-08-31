import validate from 'validate.js';

const checkTaxtId = (taxId) => {
  const invalidList = '00000000,11111111';
  if (/^\d{8}$/.test(taxId) === false || invalidList.indexOf(taxId) !== -1) {
    return false;
  }

  const validateOperator = [1, 2, 1, 2, 1, 2, 4, 1];
  const calculate = (product) => { // 個位數 + 十位數
    const ones = product % 10;
    const tens = (product - ones) / 10;
    return ones + tens;
  };
  let sum = 0;
  for (let i = 0; i < validateOperator.length; i += 1) {
    sum += calculate(taxId[i] * validateOperator[i]);
  }

  return sum % 10 === 0 || (taxId[6] === '7' && (sum + 1) % 10 === 0);
};

const checkTwIdNumber = (value) => {
  // 建立字母分數陣列(A~Z)
  const cityAlpha = [
    1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
    20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30,
  ];
  const idNumber = value.toUpperCase();
  // 使用「正規表達式」檢驗格式
  if (!(/^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test(idNumber))) {
    return false;
  }
  // 將字串分割為陣列(IE必需這麼做才不會出錯)
  const idNumberChars = idNumber.split('');
  // 計算總分
  let total = cityAlpha[idNumberChars[0].charCodeAt(0) - 65];
  for (let i = 1; i <= 8; i += 1) {
    total += eval(idNumberChars[i]) * (9 - i);
  }
  // 補上檢查碼(最後一碼)
  total += eval(idNumberChars[9]);
  // 檢查比對碼(餘數應為0);
  return (total % 10) === 0;
};

/**
 *
 * @value,
 * @options,
 * [@key]
 * [@attributes]
 */
validate.validators.idNoOrUnitNoFormat = (value, options) => {
  const { idNumberError, taxIdError } = options;
  if ((/^[A-Z]{1}[1-2]{1}[0-9]{0,8}$/.test(value))) {
    return !checkTwIdNumber(value) ? idNumberError : null;
  } else if ((/^\d{1,8}$/).test(value)) {
    return !checkTaxtId(value) ? taxIdError : null;
  }
  return 'is totally wrong';
};


const realName = {
  presence: {
    message: '^請填真實姓名',
  },
  length: {
    maximum: 45,
    message: '^姓名長度只能 2~45 個字',
    minimum: 2,
  },
  format: {
    pattern: '[\u4e00-\u9fa5 ]{0,50}$',
    flags: 'i',
    message: '^請填中文',
  },
};

const accName = {
  presence: {
    message: '^請填戶名或公司名稱',
  },
  length: {
    maximum: 45,
    message: '^戶名長度只能 2~45 個字',
    minimum: 2,
  },
  format: {
    pattern: '[\u4e00-\u9fa5 ]{0,50}$',
    flags: 'i',
    message: '^請填中文',
  },
};

const phone = {
  presence: {
    message: '^請設定手機號碼',
  },
};

const email = {
  presence: {
    message: '^請設定電子信箱',
  },
};

const idNumber = {
  presence: {
    message: '^請填身分證字號或統編',
  },
  idNoOrUnitNoFormat: {
    idNumberError: 'id number error',
    taxIdError: 'tax id error',
  },
};

const accNo = {
  length: {
    maximum: 16,
    minimum: 10,
    message: '^銀行帳號不正確',
  },
  presence: {
    message: '^請填銀行帳號',
  },
};


export default {
  realName,
  phone,
  email,
  idNumber,
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
  accName, // 戶名或公司名稱
  accNo, // 銀行帳號
};
