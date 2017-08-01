import React from 'react';
import PropTypes from 'prop-types';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PageHeader extends React.Component {

  static defaultProps = {
    subtitle: null,
    renderIcon: null,
    renderFilter: null,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    renderIcon: PropTypes.func,
  };

  render() {
    const {
      title,
      subtitle,
      renderIcon,
    } = this.props;

    return (
      <div styleName="container">
        {
          renderIcon &&
          <div styleName="icon">
            {renderIcon()}
          </div>
        }
        <div styleName="title">{title}</div>
        {
          subtitle &&
          <div styleName="subtitle">
            {subtitle}
          </div>
        }
      </div>
    );
  }
}

export default CSS(PageHeader, styles);
