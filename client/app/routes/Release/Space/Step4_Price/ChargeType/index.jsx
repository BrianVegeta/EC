import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputRadio from '../../../components/InputRadio';
import AlertPanel from '../../../components/AlertPanel';


class ChargeType extends React.Component {
  static propTypes = {
    chargeType: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { errorMessage: null };
  }
  valid() {
    const { chargeType } = this.props;
    const errors = chargeType.validator();
    this.setState({ errorMessage: errors[0] });
  }
  render() {
    const { chargeType } = this.props;
    const { errorMessage } = this.state;
    return (
      <div>
        <div styleName="container" className="clear">
          <div styleName="chargeType">
            <InputRadio
              {...{
                checked: chargeType.is('day'),
                onChange: () => chargeType.update('day'),
              }}
            >
              <div>以日計費</div>
            </InputRadio>
          </div>
          <div styleName="chargeType">
            <InputRadio
              {...{
                checked: chargeType.is('month'),
                onChange: () => chargeType.update('month'),
              }}
            >
              <div>以月計費</div>
            </InputRadio>
          </div>
        </div>
        {errorMessage && <AlertPanel message={errorMessage} />}
      </div>
    );
  }
}

export default CSS(ChargeType, styles);
