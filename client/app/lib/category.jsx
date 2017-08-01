/* eslint-disable import/prefer-default-export */
import {
  CATEGORY_GOODS_ID,
  CATEGORY_SERVICE_ID,
  CATEGORY_SPACE_ID,
} from 'constants/enums';
import {
  flatMapDeep,
  forEach,
  map,
} from 'lodash';


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
          if (middleCategory.id === id) {
            result = middleCategory.name;
            return false;
          }

          if (!middleCategory.children) return true;
          forEach(middleCategory.children, (subCategory) => {
            if (subCategory.id === id) {
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
