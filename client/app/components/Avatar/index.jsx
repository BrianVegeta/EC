import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import SinglePreload from 'components/SinglePreload';
import TransitionFade from 'components/Transition/Fade';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { Placehoder, Container, Coaster } from './styles';

const cx = classnames.bind(styles);
class Avatar extends React.Component {

  static defaultProps = {
    src: null,
    width: '100%',
    style: null,
    round: true,
  };

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    style: myPropTypes.style,
    round: PropTypes.bool,
  };

  render() {
    const {
      src,
      width,
      round,
      style,
    } = this.props;

    const size = typeof width === 'number' ? `${width}px` : width;
    console.log(src);
    return (
      <Placehoder
        className={cx('placeholder')}
        size={size}
        round={round}
        style={style}
      >
        <SinglePreload
          imageSrc={src}
          renderLoading={() => (null)}
          renderLoaded={imageSrc => (
            <Coaster
              round={round}
              style={style}
            >
              <TransitionFade>
                <Container
                  className={cx('container')}
                  size={size}
                  round={round}
                  style={style}
                  bg={imageSrc}
                />
              </TransitionFade>
            </Coaster>
          )}
          renderFailed={() => (null)}
        />
      </Placehoder>
    );
  }
}

export default CSS(Avatar, styles);
