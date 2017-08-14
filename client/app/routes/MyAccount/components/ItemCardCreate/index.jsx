import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import PlusIcon from 'react-icons/lib/md/add';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class ItemCardCreate extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div styleName="container">
        <Link to={this.props.path} >
          <div styleName="picture">
            <div styleName="label">
              <PlusIcon size={50} />
              <div styleName="text">發佈</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CSS(ItemCardCreate, styles);
