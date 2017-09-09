import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { browserHistory } from 'react-router';
import RoundButton from 'components/RoundButton';
import { my } from 'lib/paths';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
  CATEGORY_USED_GOODS,
} from 'constants/enums';

import styles from './styles.sass';

class ControlBar extends React.Component {
  static propTypes = {
    getIsActive: PropTypes.string.isRequired,
  };
  render() {
    const { getIsActive } = this.props;
    return (
      <div styleName="container">
        <RoundButton
          text="物品"
          isActive={getIsActive === CATEGORY_GOODS}
          onClick={() => browserHistory.push(my.myGoodsPath)}
        />
        <RoundButton
          text="服務"
          isActive={getIsActive === CATEGORY_SERVICE}
          onClick={() => browserHistory.push(my.myServicePath)}
        />
        <RoundButton
          text="空間"
          isActive={getIsActive === CATEGORY_SPACE}
          onClick={() => browserHistory.push(my.mySpacePath)}
        />
        <RoundButton
          text="二手"
          isActive={getIsActive === CATEGORY_USED_GOODS}
          onClick={() => browserHistory.push(my.myUsedGoodsPath)}
        />
      </div>
    );
  }
}

export default CSS(ControlBar, styles);
