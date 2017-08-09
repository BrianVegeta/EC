import React from 'react';
import PropTypes from 'prop-types';

import IconFull from 'react-icons/lib/ti/star';
import IconHalf from 'react-icons/lib/ti/star-half';

import CSS from 'react-css-modules';
import styles from './styles.sass';

import {
  STAR_EMPTY,
  STAR_HALF,
  STAR_FULL,
} from '../module';

class Star extends React.Component {

  static propTypes = {
    size: PropTypes.number.isRequired,
    activeColor: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
      STAR_EMPTY, STAR_HALF, STAR_FULL,
    ]).isRequired,
  };

  render() {
    const { size, status, activeColor } = this.props;
    return (
      <div styleName="container">
        <div styleName="star-background">
          <IconFull size={size} color="#D8D8D8" />
        </div>
        {status === STAR_FULL &&
          <div styleName="star-full">
            <IconFull size={size} color={activeColor} />
          </div>
        }
        {status === STAR_HALF &&
          <div styleName="star-half">
            <IconHalf size={size} color={activeColor} />
          </div>
        }
      </div>
    );
  }
}

export default CSS(Star, styles);
