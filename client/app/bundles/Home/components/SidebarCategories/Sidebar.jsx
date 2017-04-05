import React, { PropTypes } from 'react';
import catesConfig from './catesConfig';

class Sidebar extends React.Component {
  render() {
    return (
      <div styleName="container">
        <ul styleName="categories">
          {
            catesConfig.map((cate, index) =>
              <li styleName="category" key={`${cate.text}_${index + 1}`} >
                <span styleName="icon">
                  <i className={`fa fa-${cate.faClass}`} aria-hidden="true" />
                </span>
                {cate.text}
              </li>,
            )
          }
        </ul>
      </div>
    );
  }
}

export default Sidebar;
