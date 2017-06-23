import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import IconChecked from './IconChecked';
import IconUnchecked from './IconUnchecked';

class EditCheck extends React.Component {
  static defaultProps = {
    checked: false,
  };
  static propTypes = {
    checked: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.state = {
      checked: this.props.checked,
    };
  }
  toggleChecked() {
    this.setState({ checked: !this.state.checked });
  }
  render() {
    const { checked } = this.state;
    const size = 25;
    return (
      <button
        className="button"
        styleName="container"
        onClick={this.toggleChecked}
      >
        <div styleName="icon">
          {checked ?
            <IconUnchecked size={size} color="#FFF" /> :
            <IconChecked size={size} color="#31ABBA" innerColor="#fff" />
          }
        </div>
      </button>
    );
  }
}

export default CSS(EditCheck, styles);
