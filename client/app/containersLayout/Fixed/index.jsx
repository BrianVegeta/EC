import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import myPropTypes from 'propTypes';
import MainWrapper from '../MainWrapper';
import fixedLayoutHoc from './hoc';

class LayoutContainer extends React.Component {
  static defaultProps = {
    main: null,
  };
  static propTypes = {
    main: PropTypes.node.isRequired,
    environment: myPropTypes.environment.isRequired,
  };
  render() {
    const { main, environment } = this.props;
    return (
      <div style={{ paddingTop: 70 }}>
        <HeaderContainer />
        <MainWrapper
          minHeight={environment.height}
        >
          {main}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, auth } = state;
  return { environment, auth };
};
export default connect(mapStateToProps)(fixedLayoutHoc(LayoutContainer, true));
