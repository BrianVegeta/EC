import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import {
  isEqual,
} from 'lodash';

import SinglePreload from 'components/SinglePreload';
import TransitionFade from 'components/Transition/Fade';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { Placehoder, Container, Coaster } from './styles';

const cx = classnames.bind(styles);
class Picture extends React.Component {

  static defaultProps = {
    src: null,
    style: null,
    hasShadow: true,
  };

  static propTypes = {
    src: PropTypes.string,
    style: myPropTypes.style,
    hasShadow: PropTypes.bool,
    width: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { src } = this.props;
    return !isEqual(src, nextProps.src);
  }

  render() {
    const { src, style, width, hasShadow } = this.props;
    // const size = typeof width === 'number' ? `${width}px` : width;

    return (
      <Placehoder
        className={cx('placeholder', { 'has-shadow': hasShadow })}
        style={style}
        width={width}
        paddingBottom={100}
      >
        <SinglePreload
          imageSrc={src}
          renderLoading={() => (null)}
          renderLoaded={(imageSrc, { width: imageWidth, height }) => (
            <Coaster style={style} >
              <TransitionFade>
                <Container
                  className={cx('container')}
                  paddingBottom={(height / imageWidth) * 100}
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
