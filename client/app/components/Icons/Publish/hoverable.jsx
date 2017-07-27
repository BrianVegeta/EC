import React from 'react';
import PropTypes from 'prop-types';

export default function hoverable(Component) {
  return class extends React.Component {

    static defaultProps = {
      isHovering: false,
    };

    static propTypes = {
      isHovering: PropTypes.bool,
    };

    render() {
      const { isHovering } = this.props;
      return <Component color={isHovering ? '#F57C00' : '#FDB485'} />;
    }
  };
}
