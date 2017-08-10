import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';

import { initEnvironment } from 'actions/environmentActions';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';

import MainWrapper from '../MainWrapper';
import NavigationContainer from './NavigationContainer';
import ScrollNavigation from './ScrollNavigation';

export default class extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    dispatch: PropTypes.func.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      isNavVisible: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const top = this.layout.getBoundingClientRect().top;
    if (top < -800) {
      _.debounce(this.showNavs.bind(this), 250)();
    } else if (top > -700) {
      _.debounce(this.hideNavs.bind(this), 250)();
    }
  }

  showNavs() {
    this.setState({ isNavVisible: true });
  }

  hideNavs() {
    this.setState({ isNavVisible: false });
  }

  render() {
    const { isNavVisible } = this.state;
    const { children, environment } = this.props;
    return (
      <div ref={layout => (this.layout = layout)}>
        <HeaderContainer />
        <NavigationContainer
          visible={isNavVisible}
        >
          <ScrollNavigation />
        </NavigationContainer>
        <MainWrapper
          minHeight={environment.height}
          paddingTop={10}
        >
          {children}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}
