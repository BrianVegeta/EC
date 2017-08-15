import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import myPropTypes from 'propTypes';

import { initEnvironment } from 'actions/environmentActions';

import Footer from 'components/Footer';
import HeaderContainer from 'containers/Header/Container';
import MainWrapper from './MainWrapper';

class OwnerprofileLayout extends React.Component {

  static defaultProps = {
    main: null,
    environment: null,
  };

  static propTypes = {
    main: myPropTypes.main,
    environment: myPropTypes.environment,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const { main, environment } = this.props;
    return (
      <div>
        <HeaderContainer />
        <MainWrapper minHeight={environment.height} >
          {main}
        </MainWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(OwnerprofileLayout);
