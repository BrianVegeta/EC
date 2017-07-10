import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Radio extends React.Component {

  static defaultProps = {
    checked: false,
    onChange: null,
    helper: null,
  };

  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    helper: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.name = Math.random().toString(36).slice(2);
  }

  onChange() {
    const { onChange, checked } = this.props;

    if (onChange) {
      this.props.onChange(!checked);
    }
  }

  render() {
    const { helper, checked } = this.props;
    return (
      <div>
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
          {this.props.children}
        </label>
        {helper && <div styleName="helper">{helper}</div>}
      </div>
    );
  }
}

export default CSS(Radio, styles);
