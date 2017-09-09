import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'components/Form/Group';

import CSS from 'react-css-modules';
import styles from '../styles.sass';

class RenderAssignOwner extends React.Component {

  static defaultProps = {
    renderOption: true,
  };

  static propTypes = {
    renderOption: PropTypes.bool,
    cityArea: PropTypes.string.isRequired,
  };

  render() {
    const { renderOption, cityArea } = this.props;
    return (
      <div styleName="assign-container">
        <FormGroup helperBottom="當分享人同意您的預定時，您將會收到確切的服務地址。">
          {renderOption && <div styleName="assign-type">到店服務</div>}
          <div styleName="assign-content">
            <span styleName="address-label">地點：</span>
            <span styleName="address">{cityArea}</span>
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default CSS(RenderAssignOwner, styles);
