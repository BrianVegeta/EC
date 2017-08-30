// @author: vincent
import Title from './Title';
import Description from './Description';
import Cities from './Cities';

export default class {
  constructor({ newWish, dispatch }) {
    const { title, description, cityName, areaName } = newWish;
    this.titleModel = new Title({ title, dispatch });
    this.descriptionModel = new Description({ description, dispatch });
    this.citiesModel = new Cities({ cityName, areaName, dispatch });
  }
}
