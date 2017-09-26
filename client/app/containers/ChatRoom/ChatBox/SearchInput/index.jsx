import React from 'react';
import PropTypes from 'prop-types';
import IconSearch from 'react-icons/lib/md/search';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class SearchInput extends React.Component {

  static propTypes = {
    dispatchChangSearchInput: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
      input: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(e) {
    const { dispatchChangSearchInput } = this.props;
    const { input } = this.state;
    if (e.key !== 'Enter') return;
    dispatchChangSearchInput(input);
  }

  onInputChange(e) {
    const input = e.target.value;
    this.setState({ input });
    if (input === '') {
      this.props.dispatchChangSearchInput(input);
    }
  }

  render() {
    const { isFocusing } = this.state;
    return (
      <div className={cx('container', { focusing: isFocusing })}>
        <IconSearch size={18} styleName="icon" />
        <input
          styleName="input"
          placeholder="搜尋"
          onFocus={() => this.setState({ isFocusing: true })}
          onBlur={() => this.setState({ isFocusing: false })}
          onChange={this.onInputChange}
          onKeyDown={this.onEnter}
        />
      </div>
    );
  }
}

export default CSS(SearchInput, styles);
