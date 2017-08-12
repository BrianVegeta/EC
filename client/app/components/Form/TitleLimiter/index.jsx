import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class FormTitleLimiter extends React.Component {

  static propTypes = {
    length: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  };

  render() {
    const {
      length,
      limit,
    } = this.props;

    return (
      <span>
        <span className={cx({ 'limit-error': (length > limit) })}>
          {length}
        </span>/{limit}
      </span>
    );
  }
}

export default FormTitleLimiter;
