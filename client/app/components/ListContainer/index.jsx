import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import LoadingOverlay from 'components/Loading/Overlay';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class ListContainer extends React.Component {

  static defaultProps = {
    minHeight: 400,
    noDataText: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    noDataText: PropTypes.string,
    minHeight: PropTypes.number,
    isInitialFetching: PropTypes.bool.isRequired,
  };

  renderContent() {
    const {
      isInitialFetching,
      noDataText,
      children,
    } = this.props;

    if (isInitialFetching) {
      return <LoadingOverlay />;
    }

    if (noDataText) {
      return <div styleName="no-data">{noDataText}</div>;
    }

    return children;
  }

  render() {
    const {
      minHeight,
    } = this.props;

    return (
      <div styleName="container" style={{ minHeight }} >
        {this.renderContent()}
      </div>
    );
  }
}

export default CSS(ListContainer, styles);
