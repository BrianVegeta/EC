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
class Picture extends React.Component {

  static defaultProps = {
    width: '100%',
    src: null,
    style: null,
  };

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    style: myPropTypes.style,
  };

  render() {
    const { src, width, style } = this.props;
    const size = typeof width === 'number' ? `${width}px` : width;

    return (
      <Placehoder
        className={cx('placeholder')}
        size={size}
        style={style}
      >
        <SinglePreload
          imageSrc={src}
          renderLoading={() => (null)}
          renderLoaded={imageSrc => (
            <Coaster
              style={style}
            >
              <TransitionFade>
                <Container
                  className={cx('container')}
                  size={size}
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

export default CSS(Picture, styles);
