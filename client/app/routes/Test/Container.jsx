import React from 'react';
import CSS from 'react-css-modules';
import BellIcon from '../../components/Icons/Bell';
import Loudspeaker from '../../components/Icons/Loudspeaker';
import styles from './styles.sass';

class Test extends React.Component {

  render() {
    return (
      <div styleName="container">
        <BellIcon />
        <Loudspeaker />
      </div>
    );
  }
}

export default CSS(Test, styles);
