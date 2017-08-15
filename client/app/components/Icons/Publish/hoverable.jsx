import React from 'react';
import PropTypes from 'prop-types';

export default function hoverable(Component) {
  return class extends React.Component {

    static defaultProps = {
      isHovering: false,
      size: 34,
    };

    static propTypes = {
      isHovering: PropTypes.bool,
      size: PropTypes.number,
    };

    render() {
      const { isHovering, size } = this.props;
      return (
        <Component
          color={isHovering ? '#F57C00' : '#FDB485'}
          size={size}
        />
      );
    }
  };
}
