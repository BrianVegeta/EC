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
        {list.map((listItem, index) => {
          const { action, link, text } = listItem;
          const itemContent = <div styleName="linkContent">{text}</div>;
          return (
            <li key={`${index + 1}`} styleName="listItem">
              {action &&
                <button className="button" onClick={action} >
                  {itemContent}
                </button>
              }
              {link &&
                <Link to={listItem.link} >{itemContent}</Link>
              }
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CSS(DropdownNavs, styles);
