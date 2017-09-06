import React from 'react';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Avatar from '../../../components/Avatar';
import myPropTypes from '../../../propTypes';

const cx = classnames.bind(styles);
class Me extends React.Component {
  static propTypes = {
    currentUser: myPropTypes.currentUser.isRequired,
  };
  render() {
    const { currentUser } = this.props;
    return (
      <Avatar width={30} src={currentUser.picture} />
    );
  }
}

export default CSS(Me, styles);
