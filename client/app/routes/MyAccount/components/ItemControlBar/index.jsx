import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import RoundButton from '../../../../components/RoundButton';

class ControlBar extends React.Component {
  static propTypes = {
    tab: PropTypes.func.isRequired,
    getIsActive: PropTypes.func.isRequired,
  };
  render() {
    const { tab, getIsActive } = this.props;
    return (
      <div styleName="container">
        <RoundButton
          text="物品"
          isActive={getIsActive('goods')}
          onClick={() => tab('goods')}
        />
        <RoundButton
          text="服務"
          isActive={getIsActive('service')}
          onClick={() => tab('service')}
        />
        <RoundButton
          text="空間"
          isActive={getIsActive('space')}
          onClick={() => tab('space')}
        />
      </div>
    );
  }
}

export default CSS(ControlBar, styles);
