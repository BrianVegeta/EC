import React from 'react';
import PropTypes from 'prop-types';

import colors from 'styles/colorExport.scss';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Star from './Star';
import {
  STAR_EMPTY,
  STAR_HALF,
  STAR_FULL,
} from './module';

class Stars extends React.Component {

  static defaultProps = {
    activeColor: colors.primaryColor,
    size: 16,
  };

  static propTypes = {
    activeColor: PropTypes.string,
    size: PropTypes.number,
    score: PropTypes.number.isRequired, // ex: 1.111111111
  };

  static renderStatus(score) {
    if (score >= 2) {
      return STAR_FULL;
    }
    if (score === 1) {
      return STAR_HALF;
    }
    return STAR_EMPTY;
  }

  render() {
    const { activeColor, score, size } = this.props;
    const handleScore = Math.round(score * 2);
    const { renderStatus } = this.constructor;

    return (
      <div styleName="container">
        {[0, 2, 4, 6, 8].map((reduce, index) => (
          <Star
            key={`${index + 1}`}
            size={size}
            activeColor={activeColor}
            status={renderStatus(handleScore - reduce)}
          />
        ))}
      </div>
    );
  }
}

export default CSS(Stars, styles);
