import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import Preload from 'react-preload';
import TransitionFade from 'components/Transition/Fade';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { Placehoder, Container } from './styles';

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

  constructor(props) {
    super(props);
    this.state = {
      isPreloadSuccessful: false,
    };
  }

  render() {
    const { src, width, style } = this.props;
    const { isPreloadSuccessful } = this.state;
    const size = typeof width === 'number' ? `${width}px` : width;

    return (
      <Placehoder
        styleName="placeholder"
        size={size}
        style={style}
        hasImage={isPreloadSuccessful}
      >
        <Preload
          loadingIndicator={
            <Container
              styleName="container"
              size={size}
              style={style}
              bg={null}
            />
          }
          images={[src]}
          resolveOnError
          onSuccess={() => { console.log('success'); }}
          onError={() => { console.log('error'); }}
          mountChildren
        >
          <TransitionFade>
            <Container
              styleName="container"
              size={size}
              style={style}
              bg={null}
            />
          </TransitionFade>
        </Preload>
      </Placehoder>
    );
  }
}

export default CSS(Picture, styles);
