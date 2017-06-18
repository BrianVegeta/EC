import React from 'react';
import PropTypes from 'prop-types';

export default function inputWithError(Component) {
  return class extends React.Component {
    static propTypes = {
      resource: PropTypes.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = { errors: [] };
    }
    validate() {
      const { resource } = this.props;
      const errors = resource.validator();
      this.setState({ errors: errors || [] });
    }
    render() {
      const inputProps = { ...this.props, errorMessage: this.state.errors[0] };
      return <Component {...inputProps} />;
    }
  };
}
