import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarNavs from '../SidebarNavs';

class ReleaseGoods extends React.PureComponent {
  static propTypes = {
    formComponent: PropTypes.node.isRequired,
    environment: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number, PropTypes.bool,
      ]),
    ).isRequired,
  };
  render() {
    const { environment } = this.props;
    const minHeight = environment.height - 70;
    const paddingTop = 100;
    return (
      <div
        className="release-wrapper"
        style={{ minHeight }}
      >
        <div
          className="main"
          style={{ minHeight, paddingTop }}
        >
          <div className="content-wrapper">
            {this.props.formComponent}
          </div>
        </div>
        <div
          className="sidebar-left"
          style={{ minHeight, paddingTop }}
        >
          <SidebarNavs />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, itemRelease } = state;
  return ({ environment, routesHelper, itemRelease });
};
export default connect(mapStateToProps)(ReleaseGoods);
