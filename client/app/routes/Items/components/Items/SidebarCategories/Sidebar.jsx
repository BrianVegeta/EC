import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  items: PropTypes.object.isRequired,
  currentType: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  routesHelper: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
class Sidebar extends React.Component {

  static isCategoriesInclude(category, id) {
    const { subcates } = category;
    const ids = subcates.map(subcate => subcate.id);
    return category.id === id || ids.indexOf(id) >= 0;
  }

  constructor(props) {
    super(props);
    this.state = { index: 0, isOpen: false };
    this.handleSubcatesToggle = this.handleSubcatesToggle.bind(this);
  }

  handleSubcatesToggle(index) {
    const isOpen = (this.state.index === index) ? !this.state.isOpen : this.state.isOpen;
    this.setState({ index, isOpen });
  }

  ableToExpandSubcates(category) {
    const { params } = this.props;
    const { subcates } = category;
    return (
      subcates && params.id &&
      this.constructor.isCategoriesInclude(category, parseInt(params.id, 10))
    );
  }

  renderSubcates(categories) {
    const { params } = this.props;
    const currentCateId = (params.id ? parseInt(params.id, 10) : 0);
    return (
      <ul styleName="subcates">
        {
          categories.map((category, subIndex) =>
            <li
              key={`${subIndex + 1}`}
              styleName="sub-category"
            >
              <Link to={category.link} styleName="link">
                <div styleName={(category.id === currentCateId) && 'active-subcate-inner'}>
                  {category.text}
                </div>
              </Link>
            </li>,
          )
        }
      </ul>
    );
  }

  renderRootCategory() {
    const { routesHelper, currentType } = this.props;
    const category = {};
    switch (currentType) {
      case 'goods':
        category.link = routesHelper.items.goods;
        category.text = '全部物品';
        break;
      case 'service':
        category.link = routesHelper.items.service;
        category.text = '全部服務';
        break;
      case 'space':
        category.link = routesHelper.items.space;
        category.text = '全部空間';
        break;
      default:
        category.link = routesHelper.items.goods;
        category.text = '全部物品';
    }
    return (
      <li styleName="category">
        <Link to={category.link} styleName="link">
          <div styleName={this.props.location.pathname === category.link && 'active-category-inner'}>
            <span styleName="icon">
              <i className="fa fa-suitcase" aria-hidden="true" />
            </span>
            <span styleName="text">{category.text}</span>
          </div>
        </Link>
      </li>
    );
  }

  render() {
    const { items, currentType } = this.props;
    const categories = items.categories[currentType] || [];
    return (
      <div styleName="container">
        <ul styleName="categories">
          { this.renderRootCategory() }
          {
            categories.map((category, index) => {
              const { subcates, text, link } = category;
              return (
                <li key={`${text}_${index + 1}`} styleName="category">
                  <Link to={link} styleName="link">
                    <div styleName={this.ableToExpandSubcates(category) && 'active-category-inner'}>
                      <span styleName="icon">
                        <i className="fa fa-suitcase" aria-hidden="true" />
                      </span>
                      <span styleName="text">{text}</span>
                    </div>
                  </Link>
                  { this.ableToExpandSubcates(category) && this.renderSubcates(subcates) }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
Sidebar.propTypes = propTypes;
export default Sidebar;
