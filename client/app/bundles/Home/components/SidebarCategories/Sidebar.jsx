import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import catesConfig from './catesConfig';

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

  render() {
    const { hasSubcates } = this.constructor;
    return (
      <div styleName="container">
        <ul styleName="categories">
          {
            catesConfig.map((category, index) => {
              const { subcates } = category;
              return (
                <li key={`${category.text}_${index + 1}`} styleName="category">
                  <Link
                    to="/"
                    onClick={hasSubcates(category) && (() => this.handleSubcatesToggle(index))}
                  >
                    <span styleName="icon">
                      <i className={`fa fa-${category.faClass}`} aria-hidden="true" />
                    </span>
                    <span>{category.text}</span>
                  </Link>
                  {
                    hasSubcates(category) &&
                    this.state.index === index &&
                    this.state.isOpen &&
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
