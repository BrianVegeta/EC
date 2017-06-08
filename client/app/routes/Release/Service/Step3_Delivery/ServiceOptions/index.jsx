import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputCheckbox from '../../../components/InputCheckbox';
import FormGroup from '../../../components/FormGroup';
import AssignAddress from './AssignAddress';

class ServiceOptions extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    assignment: PropTypes.object.isRequired,
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onToHomeActive = this.onToHomeActive.bind(this);
    this.onComeToActive = this.onComeToActive.bind(this);
    this.state = {
      addressOpen: false,
    };
  }
  onToHomeActive(checked) {
    const { assignment, onChange } = this.props;
    onChange(assignment.checkToHome(checked).options);
  }
  onComeToActive(checked) {
    const { assignment, onChange } = this.props;
    onChange(assignment.checkComeTo(checked).options);
  }
  valid() {
    if (this.props.assignment.isComeToActive) this.address.valid();
  }
  render() {
    const { cities, dispatch, assignment } = this.props;
    return (
      <div styleName="container">
        <div styleName="option">
          <InputCheckbox
            {...{
              checked: assignment.isToHomeActive,
              onChange: this.onToHomeActive,
            }}
          >
            <span styleName="label">到府服務</span>
          </InputCheckbox>
        </div>
        <div styleName="option">
          <InputCheckbox
            {...{
              checked: assignment.isComeToActive,
              onChange: this.onComeToActive,
            }}
          >
            <span styleName="label">顧客親自前往</span>
          </InputCheckbox>
          {assignment.isComeToActive &&
            <div styleName="address">
              <FormGroup headerText="服務地址">
                <AssignAddress
                  {...{
                    ref: addr => (this.address = addr),
                    cities,
                    assignment,
                    dispatch,
                  }}
                />
              </FormGroup>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default CSS(ServiceOptions, styles);
