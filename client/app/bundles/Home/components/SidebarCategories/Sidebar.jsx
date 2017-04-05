import React, { PropTypes } from 'react';
import catesConfig from './catesConfig';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, isOpen: false };
    this.handleSubcatesToggle = this.handleSubcatesToggle.bind(this);
  }

  handleSubcatesToggle(index) {
    const isOpen = !this.state.isOpen;
    this.setState({ index, isOpen });
  }

  render() {
    return (
      <div styleName="container">
        <ul styleName="categories">
          {
            catesConfig.map((cate, index) => {
              const { subcates } = cate;
              return (
                <li
                  onClick={subcates === undefined ? null : () => (this.handleSubcatesToggle(index))}
                  key={`${cate.text}_${index + 1}`}
                  styleName="category"
                >
                  <span styleName="icon">
                    <i className={`fa fa-${cate.faClass}`} aria-hidden="true" />
                  </span>
                  {cate.text}
                  {
                    cate.subcates !== undefined && this.state.index === index && this.state.isOpen &&
                      <ul styleName="subcates">
                        {
                          cate.subcates.map(subcate =>
                            <li>{subcate.text}</li>,
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
