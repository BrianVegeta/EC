import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class UserList extends React.Component {

  static propTypes = {
    rooms: PropTypes.array.isRequired,
  };

  const ;

  renderUser({ members: [{ name, picture }] }) {
    return (
      <div styleName="user-container">
        <div styleName="avatar">
          <Avatar src={picture} />
        </div>
        <span styleName="name">{name}</span>
      </div>
    );
  }

  render() {
    const {
      rooms,
    } = this.props;
    return (
      <div styleName="container">
        {rooms.map(this.renderUser)}
      </div>
    );
  }
}

export default CSS(UserList, styles);
