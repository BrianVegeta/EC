import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnvironment } from '../actions/environmentActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemNavigation from '../components/ItemNavigation';

const defaultProps = {
  main: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  main: PropTypes.object,
};
class LayoutContainer extends React.Component {

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
      this.setState({ isNavVisible: true });
    } else {
      this.setState({ isNavVisible: false });
    }
  }


  render() {
    const { isNavVisible } = this.state;
    const { main } = this.props;
    return (
      <div ref={layout => (this.layout = layout)}>
        <Header {...this.props} positionStatic />
        <div style={{ paddingTop: 30 }} />
        <ItemNavigation
          isVisible={isNavVisible}
          {...this.props}
        />
        <div className="container clear" style={{ minHeight: '1000px' }} >
          <div className="main-container">{ main }</div>
        </div>
        <Footer />
      </div>
    );
  }
}
LayoutContainer.propTypes = propTypes;
LayoutContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const { environment, auth, routesHelper, itemLayout } = state;
  return ({
    environment,
    auth,
    routesHelper,
    itemLayout,
  });
};
export default connect(mapStateToProps)(LayoutContainer);
