import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Filter extends React.Component {
  render() {
    return (
      <div styleName="container" className="clear">
        <ul styleName="options">
          <li styleName="option">
            所在城市
            <span styleName="dropdown-icon">
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
          </li>
          <li styleName="option">
            交貨方式
            <span styleName="dropdown-icon">
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
          </li>
          <li styleName="option">
            排序
            <span styleName="dropdown-icon">
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
          </li>
          <li styleName="option">
            價格範圍
            <span styleName="dropdown-icon">
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default CSS(Filter, styles);
