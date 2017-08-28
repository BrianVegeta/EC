import React from 'react';
import PropTypes from 'prop-types';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputSelectionCatesContainer from 'components/Input/SelectionCates/Container';
import InputTextTag from 'components/Input/TextTag';
import FormGroup from 'components/Form/Group';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints';
import {
  CATEGORY_GOODS,
} from 'constants/enums';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class StepAbout extends React.Component {

  static propTypes = {
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    publish: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    isValid: PropTypes.bool.isRequired,
    nextStep: PropTypes.func.isRequired,
  };

  static renderButtonStatus(isValid) {
    return isValid ? STATUS_VALID : STATUS_DISABLE;
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  onNextStepClick() {
    const {
      dispatchValidate,
      nextStep,
    } = this.props;
    dispatchValidate()
    .then(() => {
      nextStep();
    })
    .catch(() => {
      this.titleInput.valid();
      this.descriptInput.valid();
      this.cityAreaInput.valid();
      this.categoryInput.valid();
      this.tag1Input.valid();
      this.tag2Input.valid();
      this.tag3Input.valid();
    });
  }

  render() {
    const {
      publish,
      dispatchChangeData,
      isValid,
    } = this.props;

    const {
      title,
      descript,
      cityName, areaName,
      categoryID,
      tag1,
      tag2,
      tag3,
    } = publish;

    return (
      <FormContainer title="關於物品" >
        <FormGroup
          headerText={'物品名稱'}
          limiter={<FormTitleLimiter limit={30} length={title.length} />}
        >
          <InputText
            ref={titleInput => (this.titleInput = titleInput)}
            placeholder="請輸入物品標題"
            onChange={value => dispatchChangeData({ title: value })}
            value={title}
            constraints={constraints.title}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup
          headerText={'物品描述'}
          limiter={<FormTitleLimiter limit={250} length={descript.length} />}
        >
          <InputTextArea
            ref={descriptInput => (this.descriptInput = descriptInput)}
            placeholder="清楚介紹您的物品，敘述更多吸引人的細節"
            onChange={value => dispatchChangeData({ descript: value })}
            value={descript}
            constraints={constraints.descript}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup headerText="物品地區">
          <InputSelectionCitiesContainer
            ref={cityAreaInput => (
              this.cityAreaInput = (cityAreaInput && cityAreaInput.getWrappedInstance())
            )}
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
        <FormGroup headerText={'分類'}>
          <InputSelectionCatesContainer
            ref={categoryInput => (
              this.categoryInput = (categoryInput && categoryInput.getWrappedInstance())
            )}
            topCategory={CATEGORY_GOODS}
            categoryId={categoryID}
            placeholder="請選擇分類"
            onSelect={category => dispatchChangeData({ categoryID: category.categoryID })}
            value={categoryID ? String(categoryID) : ''}
            constraints={constraints.category}
            validateOnBlur
          />
        </FormGroup>
        <FormGroup headerText={'加入 #標籤'}>
          <div styleName="tag-block">
            <InputTextTag
              ref={tag1Input => (this.tag1Input = tag1Input)}
              placeholder="標籤"
              onChange={value => dispatchChangeData({ tag1: value })}
              value={tag1}
              constraints={constraints.tag}
              validateOnBlur
            />
          </div>
          <div styleName="tag-block">
            <InputTextTag
              ref={tag2Input => (this.tag2Input = tag2Input)}
              placeholder="標籤"
              onChange={value => dispatchChangeData({ tag2: value })}
              value={tag2}
              constraints={constraints.tag}
              validateOnBlur
            />
          </div>
          <div styleName="tag-block">
            <InputTextTag
              ref={tag3Input => (this.tag3Input = tag3Input)}
              placeholder="標籤"
              onChange={value => dispatchChangeData({ tag3: value })}
              value={tag3}
              constraints={constraints.tag}
              validateOnBlur
            />
          </div>
        </FormGroup>
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepAbout, styles);
