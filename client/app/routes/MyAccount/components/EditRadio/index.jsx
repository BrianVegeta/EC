import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class EditRadio extends React.Component {
  static defaultProps = {
    checked: true,
  };
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.name = Math.random().toString(36).slice(2);
  }
  onChange() {
    this.props.onChange();
  }
  render() {
    const { checked, children } = this.props;
    return (
      <label
        className={cx('radio', { radioChecked: checked })}
        htmlFor={this.name}
      >
        <input
          {...{
            type: 'radio',
            id: this.name,
            onChange: this.onChange,
            checked,
          }}
        />
        {children}
      </label>
    );
  }
}

export default CSS(EditRadio, styles);
