/* eslint-disable import/prefer-default-export */
import {
  CATEGORY_GOODS_ID,
  CATEGORY_GOODS,
  CATEGORY_SERVICE_ID,
  CATEGORY_SERVICE,
  CATEGORY_SPACE_ID,
  CATEGORY_SPACE,
} from 'constants/enums';
import {
  flatMapDeep,
  forEach,
  map,
  parseInt,
} from 'lodash';

export const findCategoryNamesByID = (id, middleCategories) => {
  let result = null;
  forEach(middleCategories, (middleCategory) => {
    if (middleCategory.id.toString() === String(id)) {
      result = { middleName: middleCategory.name };
      return false;
    }

    if (!middleCategory.children) return true;
    forEach(middleCategory.children, (subCategory) => {
      if (subCategory.id.toString() === String(id)) {
        result = {
          middleName: middleCategory.name,
          name: subCategory.name,
        };
        return false;
      }
      return true;
    });
    return true;
  });
  return result;
};

export const mapCategoryNameByID = (id, categories) => {
  switch (id) {
    case CATEGORY_GOODS_ID:
      return '全部物品';

    case CATEGORY_SERVICE_ID:
      return '全部服務';

    case CATEGORY_SPACE_ID:
      return '全部空間';

    default: {
      let result = null;
      forEach(categories, (middleCategories) => {
        forEach(middleCategories, (middleCategory) => {
          if (middleCategory.id.toString() === id) {
            result = middleCategory.name;
            return false;
          }

          if (!middleCategory.children) return true;
          forEach(middleCategory.children, (subCategory) => {
            if (subCategory.id.toString() === id) {
              result = subCategory.name;
              return false;
            }
            return true;
          });
          return true;
        });
      });
      return result;
    }
  }
};


export function flattenCategories(categories) {
  return flatMapDeep(categories, middleCategories =>
    map(middleCategories, middleCategory => (
      middleCategory.children ?
        [middleCategory, middleCategory.children] : middleCategory
    )),
  );
}

export const findTopCategory = (id, categories) => {
  switch (id) {
    case CATEGORY_GOODS_ID:
      return CATEGORY_GOODS;

    case CATEGORY_SERVICE_ID:
      return CATEGORY_SERVICE;

    case CATEGORY_SPACE_ID:
      return CATEGORY_SPACE;

    default: {
      let result = null;
      const intId = parseInt(id);
      forEach(categories, (middleCategories, topCategory) => {
        forEach(middleCategories, (middleCategory) => {
          if (middleCategory.id === intId) {
            result = topCategory;
            return false;
          }

          if (!middleCategory.children) return true;
          forEach(middleCategory.children, (subCategory) => {
            if (subCategory.id === intId) {
              result = topCategory;
              return false;
            }
            return true;
          });
          return true;
        });
      });
      return result;
    }
  }
};
