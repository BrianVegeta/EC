import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnvironment } from '../actions/environmentActions';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../components/Footer';
import myPropTypes from '../propTypes';
import MainWrapper from './MainWrapper';

class HomeContainer extends React.Component {
  static propTypes = {
    main: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    environment: myPropTypes.environment.isRequired,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }
  render() {
    const { main, environment } = this.props;
    return (
      <div>
        <HeaderContainer searchable hasShortcut />
        <MainWrapper minHeight={environment.height} >{ main }</MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(HomeContainer);
