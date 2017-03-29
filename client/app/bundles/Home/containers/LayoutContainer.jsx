import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initEnviroment } from '../actions/enviromentActions';
import Header from '../components/Header';
import HomeContainer from './HomeContainer';

const defaultProps = {
  main: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  main: PropTypes.object,
};
class LayoutContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnviroment());
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <div className="container clear red-border" style={{ minHeight: '1000px' }}>
          <div className="main-container">
            { this.props.main === null ? <HomeContainer /> : this.props.main }
          </div>
        </div>
      </div>
    );
  }
}
LayoutContainer.propTypes = propTypes;
LayoutContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const { enviroment, auth } = state;
  return ({
    enviroment,
    auth,
  });
};
export default connect(mapStateToProps)(LayoutContainer);
