import React from 'react';
import PropTypes from 'prop-types';
import IconSearch from 'react-icons/lib/md/search';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class SearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
    };
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
        />
      </div>
    );
  }
}

export default CSS(SearchInput, styles);
