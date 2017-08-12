import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import FormGroup from 'components/Form/Group';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints';
// import {
//   InputTextareaWithError,
//   InputSelectionCitiesWithError,
//   InputSelectionCatesWithError,
//   AlertPanel,
//   NextStep,
// } from '../../components';

// import ButtonNextStep, {
//   STATUS_DISABLE,
//   STATUS_LOADING,
//   STATUS_VALID,
// } from 'components/Button/NextStep';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

// const cx = classnames.bind(styles);
class StepAbout extends React.Component {

  static propTypes = {
    dispatchChangeData: PropTypes.func.isRequired,
    publish: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      publish,
      dispatchChangeData,
    } = this.props;

    const {
      title,
      descript,
      cityName, areaName,
    } = publish;

    return (
      <FormContainer title="關於服務" >
        <FormGroup
          headerText={'服務名稱'}
          limiter={<FormTitleLimiter limit={30} length={title.length} />}
        >
          <InputText
            placeholder="請輸入服務標題"
            onChange={value => dispatchChangeData({ title: value })}
            value={title}
            constraints={constraints.title}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup
          headerText={'服務描述'}
          limiter={<FormTitleLimiter limit={250} length={descript.length} />}
        >
          <InputTextArea
            placeholder="清楚介紹您的服務，敘述更多吸引人的細節"
            onChange={value => dispatchChangeData({ descript: value })}
            value={descript}
            constraints={constraints.descript}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup headerText="服務地區">
          <InputSelectionCitiesContainer
            cityName={cityName}
            areaName={areaName}
            value={`${cityName}${areaName}`}
            onSelect={city => dispatchChangeData({
              cityName: city.cityName,
              areaName: city.areaName,
            })}
            constraints={constraints.cityArea}
            validateOnBlur
          />
        </FormGroup>
      </FormContainer>
    );
  }
}

export default CSS(StepAbout, styles);
