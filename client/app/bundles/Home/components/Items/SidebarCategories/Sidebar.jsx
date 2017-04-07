import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Sidebar extends React.Component {
  static hasSubcates(category) {
    const { subcates } = category;
    return subcates !== undefined;
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
    const { routeParams } = this.props;
    const { subcates } = category;
    return (
      subcates &&
      routeParams.id &&
      category.id === parseInt(routeParams.id, 10)
    );
  }

  render() {
    const { hasSubcates } = this.constructor;
    const { items, currentType, routeParams } = this.props;
    const categories = items.categories[currentType] || [];
    return (
      <div styleName="container">
        <ul styleName="categories">
          {
            categories.map((category, index) => {
              const { subcates, text, link } = category;
              return (
                <li key={`${text}_${index + 1}`} styleName="category">
                  <Link to={link}>
                    <span styleName="icon">
                      <i className="fa fa-suitcase" aria-hidden="true" />
                    </span>
                    <span>{text}</span>
                  </Link>
                  {
                    this.ableToExpandSubcates(category) &&
                      <ul styleName="subcates">
                        {
                          subcates.map((subcate, subIndex) =>
                            <li key={`${subIndex + 1}`}>{subcate.text}</li>,
                          )
                        }
                      </ul>
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default Sidebar;
