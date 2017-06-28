import React from 'react';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../propTypes';

class DropdownNavs extends React.Component {
  static propTypes = {
    list: myPropTypes.navsDropdownList.isRequired,
  };
  render() {
    const { list } = this.props;
    return (
      <ul styleName="container">
        {list.map((listItem, index) =>
          <li key={`${index + 1}`} styleName="listItem">
            <Link to={listItem.link} >{listItem.text}</Link>
          </li>,
        )}
      </ul>
    );
  }
}

export default CSS(DropdownNavs, styles);
