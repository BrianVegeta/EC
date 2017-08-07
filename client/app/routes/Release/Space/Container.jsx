import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchCategories,
} from '../../../actions/itemsActions';
import SidebarContainer from './Sidebar/Container';

class ServiceContainer extends React.PureComponent {
  static propTypes = {
    formComponent: PropTypes.node.isRequired,
    environment: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number, PropTypes.bool,
      ]),
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }
  render() {
    const FIXED_HEADER_HEIGHT = 70;
    const PADDING_TOP = 100;
    const { environment } = this.props;
    const minHeight = environment.height - FIXED_HEADER_HEIGHT;
    const paddingTop = PADDING_TOP;
    const releaseWrapperStyle = {
      minHeight,
    };
    const mainStyle = {
      minHeight,
      paddingTop,
    };
    const sidebarLeftStyle = {
      minHeight: environment.height,
      paddingTop: PADDING_TOP + FIXED_HEADER_HEIGHT,
    };
    return (
      <div className="release-wrapper" style={releaseWrapperStyle} >
        <div className="main" style={mainStyle} >
          <div className="content-wrapper">
            {this.props.formComponent}
          </div>
        </div>
        <div className="sidebar-left" style={sidebarLeftStyle} >
          <SidebarContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(withRouter(ServiceContainer));
