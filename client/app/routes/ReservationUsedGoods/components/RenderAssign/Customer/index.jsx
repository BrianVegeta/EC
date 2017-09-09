import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'components/Form/Group';

import CSS from 'react-css-modules';
import styles from '../styles.sass';

class RenderAssignCustomer extends React.Component {

  static defaultProps = {
    renderOption: true,
  };

  static propTypes = {
    renderOption: PropTypes.bool,
    cityArea: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  };

  render() {
    const { renderOption, cityArea, address } = this.props;
    return (
      <div styleName="assign-container">
        <FormGroup>
          {renderOption && <div styleName="assign-type">到府服務</div>}
          <div styleName="assign-content">
            <span styleName="address-label">地點：</span>
            <span styleName="address">{cityArea}{address}</span>
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default CSS(RenderAssignCustomer, styles);
