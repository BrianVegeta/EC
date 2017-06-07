import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SidebarNavs from '../SidebarNavs';
import {
  fetchCategories,
} from '../../../actions/itemsActions';

class ReleaseGoods extends React.PureComponent {
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
          <SidebarNavs />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(withRouter(ReleaseGoods));
