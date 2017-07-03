import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnvironment } from '../actions/environmentActions';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../components/Footer';
import debounce from '../funcs/debounce';
import MainWrapper from './MainWrapper';
import myPropTypes from '../propTypes';
import NavigationContainer from './ItemDetail/NavigationContainer';
import ScrollNavigation from './ItemDetail/ScrollNavigation';

class LayoutContainer extends React.Component {
  static defaultProps = {
    main: null,
  };
  static propTypes = {
    main: PropTypes.node.isRequired,
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
      debounce(this.setState({ isNavVisible: true }), 250);
    } else if (top > -700) {
      debounce(this.setState({ isNavVisible: false }), 250);
    }
  }
  render() {
    const { isNavVisible } = this.state;
    const { main, environment } = this.props;
    return (
      <div ref={layout => (this.layout = layout)}>
        <HeaderContainer positionStatic />
        <NavigationContainer visible={isNavVisible}>
          <ScrollNavigation />
        </NavigationContainer>
        <MainWrapper minHeight={environment.height} >{main}</MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return { environment };
};
export default connect(mapStateToProps)(LayoutContainer);
