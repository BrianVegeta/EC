export const PAYMENTTYPE_ATM = 1;
export const PAYMENTTYPE_CREDIT_CARD = 4;

export const CATEGORY_GOODS_ID = '1';
export const CATEGORY_SERVICE_ID = '2';
export const CATEGORY_SPACE_ID = '3';
export const CATEGORY_GOODS = 'goods';
export const CATEGORY_SERVICE = 'service';
export const CATEGORY_SPACE = 'space';

export const mappingCategoryFromID = {
  [CATEGORY_GOODS_ID]: CATEGORY_GOODS,
  [CATEGORY_SERVICE_ID]: CATEGORY_SERVICE,
  [CATEGORY_SPACE_ID]: CATEGORY_SPACE,
};
export const mappingIDFromCategory = {
  [CATEGORY_GOODS]: CATEGORY_GOODS_ID,
  [CATEGORY_SERVICE]: CATEGORY_SERVICE_ID,
  [CATEGORY_SPACE]: CATEGORY_SPACE_ID,
};
