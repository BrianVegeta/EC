import React from 'react';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const ReportLink = () => (
  <div styleName="container">
    <Link to="/">
      <span styleName="report-icon">
        <i className="fa fa-flag" />
      </span>
      檢舉此物品
    </Link>
  </div>
);
export default CSS(ReportLink, styles);
