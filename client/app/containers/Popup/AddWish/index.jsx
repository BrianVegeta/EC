// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Close from 'react-icons/lib/md/close';
import { connect } from 'react-redux';
import Input from 'components/Input/Text';
import Textarea from 'components/inputs/Textarea';
import FormButton from 'components/FormButton';
import SelectionCitiesContainer from 'components/inputs/SelectionCitiesContainer';

import TitleWrapper from './components/TitleWrapper';
import styles from './styles.sass';
import Model from './Model';


class PopupNewWishContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    wish: PropTypes.shape({
      newWish: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClose() {
    // this.props.dispatch(closePopup());
  }

  onSubmit() {
    console.log('submit');
  }

  render() {
    const { wish, dispatch } = this.props;
    const { newWish } = wish;
    const wishModel = new Model({ newWish, dispatch });
    const { titleModel, descriptionModel, citiesModel } = wishModel;
    return (
      <div styleName="container">
        <div styleName="header">
          <div styleName="headerTitle">建立許願紙條</div>
          <button className="button" styleName="close" onClick={this.onClose}><Close /></button>
        </div>
        <div styleName="body">
          <div styleName="title">
            <TitleWrapper error={{ limit: 30, word: titleModel.value }}>
              <Input
                value={titleModel.value}
                placeholder="願望名稱"
                onChange={titleModel.onChange}
                validator={titleModel.validator}
              />
            </TitleWrapper>
          </div>
          <div styleName="description">
            <TitleWrapper error={{ limit: 250, word: descriptionModel.value }}>
              <Textarea
                value={descriptionModel.value}
                placeholder="清楚描述您的願望"
                onChange={descriptionModel.onChange}
                validator={descriptionModel.validator}
              />
            </TitleWrapper>
          </div>
          <div styleName="category">
            <div styleName="categoryDescription">分類</div>
            <button styleName="categoryButton" className="button" >
              <div styleName="buttonDescription">請選擇</div>
              <div styleName="arrowDown"><ArrowDown size={20} /></div>
            </button>
          </div>
          <div>
            <div styleName="total">
              <div styleName="totalDescription">總預算</div>
              <Input placeholder="$" value="" />
            </div>
            <div styleName="city">
              <div styleName="cityDescription">所在城市</div>
              <SelectionCitiesContainer
                ref={citiesSelection => (
                  this.citiesSelection = (
                    citiesSelection && citiesSelection.getWrappedInstance()
                  )
                )}
                {...citiesModel.cityarea}
                onSelect={citiesModel.onSelect}
                validator={citiesModel.validator}
              />
            </div>
          </div>
        </div>
        <div styleName="footer" className="clear">
          <div styleName="buttonGroup">
            <div styleName="cancelButton">
              <FormButton
                width="auto"
                colorType="greenBorder"
                content="取消"
                onClick={this.onClose}
              />
            </div>
            <FormButton
              width="auto"
              colorType="orange"
              content="送出"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { wish } = state;
  return { wish };
};
export default connect(mapStateToProps)(CSS(PopupNewWishContainer, styles));
