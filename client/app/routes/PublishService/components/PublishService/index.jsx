import React from 'react';
// import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';

import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class PublishService extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StickyContainer style={{ height: 500, background: '#ddd', padding: '0 30px' }}>
        <Sticky>
          {
            ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
              console.log({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight });
              return (
                <div style={style}>
                  <div>adad</div>
                  <div>adad</div>
                  <div>adad</div>
                </div>
              );
            }
          }
        </Sticky>
        <div styleName="main-wrapper">
          {children}
        </div>
      </StickyContainer>
    );
  }
}

export default CSS(PublishService, styles);
