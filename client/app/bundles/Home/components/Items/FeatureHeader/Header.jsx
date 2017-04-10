import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  hasIcon: PropTypes.bool.isRequired,
};
class Header extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="context">
          <div styleName="breadcrumb">
            Home
            <span styleName="arrow">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </span>
            物品
          </div>
          <div styleName="title">
            <h1>
              {
                this.props.hasIcon &&
                  <span styleName="icon">
                    <i className="fa fa-suitcase" aria-hidden="true" />
                  </span>
              }
              {this.props.text}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
Header.propTypes = propTypes;
export default Header;
