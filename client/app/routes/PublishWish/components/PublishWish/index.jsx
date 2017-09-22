import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import CSS from 'react-css-modules';
import Dropzone from 'react-dropzone';
import RemoveIcon from 'react-icons/lib/go/trashcan';
import IconAdd from 'react-icons/lib/md/add';
import colors from 'styles/colorExport.scss';
import Picture from 'components/Picture';
import CropperEditor from 'components/Publish/CropperEditor';
import FormGroup from 'components/Form/Group';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputTextCurrency from 'components/Input/TextCurrency';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputSelectionCatesContainer from 'components/Input/SelectionCates/Container';
import InputSelection from 'components/Input/Selection';
import FormButton from 'components/FormButton';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';
import constraints from 'constraints';
import styles from './styles.sass';
// import Model from './Model';


class PublishWish extends React.Component {

  static propTypes = {
    environment: myPropTypes.environment.isRequired,
    routingHelper: PropTypes.shape({
      removeHook: PropTypes.func,
    }).isRequired,
    redirectToWish: PropTypes.func.isRequired,
    dispatchCheckEdit: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchChangeTopCat: PropTypes.func.isRequired,
    dispatchSave: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    publishWish: PropTypes.shape({
      pname: PropTypes.string,
      description: PropTypes.string,
      catId: PropTypes.number,
    }).isRequired,
    avatarCropper: PropTypes.shape({
      blob: PropTypes.string,
      key: PropTypes.string,
    }).isRequired,
    dispatchOpenCropper: PropTypes.func.isRequired,
    dispatchCloseCropper: PropTypes.func.isRequired,
    dispatchUploadAvatar: PropTypes.func.isRequired,
  };
  static topCategoryNav = [
    { value: CATEGORY_GOODS, text: '物品' },
    { value: CATEGORY_SERVICE, text: '服務' },
    { value: CATEGORY_SPACE, text: '空間' },
  ];

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.dispatchCheckEdit();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  onSave() {
    const {
      dispatchValidate, dispatchSave, redirectToWish,
      routingHelper: { removeHook },
     } = this.props;
    dispatchValidate()
    .then(() => {
      dispatchSave().then(() => {
        if (removeHook) removeHook();
        redirectToWish();
      });
    })
    .catch(() => {
      this.titleInput.valid();
      this.descriptionInput.valid();
      this.cityAreaInput.valid();
      this.categoryInput.valid();
      this.priceInput.valid();
    });
  }

  render() {
    const {
      publishWish, dispatchChangeData, dispatchChangeTopCat,
      dispatchOpenCropper, dispatchUploadAvatar, dispatchCloseCropper,
      avatarCropper, environment,
    } = this.props;
    const {
      pname, description, topCategory, catId,
      expprice, city, area, picture,
    } = publishWish;
    const { topCategoryNav } = this.constructor;
    // for upload placeholder
    const UPLOAD_ICON_SIZE = 70;
    const UPLOAD_TEXT_HELPER_LINE_HEIGHT = 20;
    const UPLOAD_MARGIN_ADJUST = -((UPLOAD_TEXT_HELPER_LINE_HEIGHT + UPLOAD_ICON_SIZE) / 2);

    return (
      <div styleName="container">
        <div styleName="header">
          <div styleName="headerTitle">建立許願紙條</div>
        </div>
        <div>
          <div styleName="photo">
            <Dropzone
              ref={refAvatar => (this.avatarDropzone = refAvatar)}
              style={{}}
              styleName="photo-dropzone"
              multiple={false}
              onDrop={([{ preview }]) => dispatchOpenCropper(preview)}
            >
              {picture ?
                <Picture src={picture} /> :
                <div
                  styleName="upload-placeholder"
                  style={{ marginTop: UPLOAD_MARGIN_ADJUST }}
                >
                  <IconAdd
                    size={UPLOAD_ICON_SIZE}
                    color={colors.placeholder}
                  />
                  <div style={{
                    lineHeight: `${UPLOAD_TEXT_HELPER_LINE_HEIGHT}px`,
                    color: `${colors.placeholder}` }}
                  >
                    上傳一張許願圖片
                  </div>
                </div>
              }
            </Dropzone>
            { picture &&
              <button
                className="button"
                styleName="photo-delete"
                onClick={() =>
                  this.props.dispatchChangeData({ picture: null })}
              >
                <RemoveIcon size={16} color="#fff" style={{ display: 'block' }} />
              </button>
            }
          </div>
          {avatarCropper.blob &&
            <CropperEditor
              cropper={avatarCropper}
              closeCropper={dispatchCloseCropper}
              uploadCover={(key, blob) => dispatchUploadAvatar(blob)}
              screenHeight={environment.height}
            />
          }
          <FormGroup
            headerText="願望名稱"
            limiter={<FormTitleLimiter limit={30} length={pname.length} />}
          >
            <InputText
              ref={titleInput => (this.titleInput = titleInput)}
              value={pname}
              placeholder="願望名稱"
              onChange={val => dispatchChangeData({ pname: val })}
              constraints={constraints.title}
              OnBlur
            />
          </FormGroup>
          <FormGroup
            headerText="願望敘述"
            limiter={<FormTitleLimiter limit={250} length={description.length} />}
          >
            <InputTextArea
              ref={descriptionInput => (this.descriptionInput = descriptionInput)}
              value={description}
              minHeight={100}
              placeholder="清楚描述您的願望"
              onChange={val => dispatchChangeData({ description: val })}
              constraints={constraints.descript}
              OnBlur
            />
          </FormGroup>
          <FormGroup headerText="分類" >
            <div className="clear">
              <div styleName="top-category">
                <InputSelection
                  options={topCategoryNav}
                  value={topCategory}
                  onSelect={val => dispatchChangeTopCat(val.value)}
                />
              </div>
              <div styleName="category">
                <InputSelectionCatesContainer
                  ref={categoryInput => (
                    this.categoryInput = (categoryInput && categoryInput.getWrappedInstance())
                  )}
                  topCategory={topCategory}
                  categoryId={catId}
                  singleLevel={topCategory === CATEGORY_SPACE}
                  placeholder="請選擇分類"
                  onSelect={category => dispatchChangeData({ catId: category.categoryID })}
                  value={catId ? String(catId) : ''}
                  constraints={constraints.category}
                  validateOnBlur
                />
              </div>
            </div>
          </FormGroup>
          <div className="clear">
            <div styleName="price-container">
              <FormGroup
                headerText="總預算"
              >
                <InputTextCurrency
                  ref={priceInput => (this.priceInput = priceInput)}
                  value={expprice}
                  onChange={value => dispatchChangeData({ expprice: value })}
                  constraints={constraints.price}
                  validateOnBlur
                />
              </FormGroup>
            </div>
            <div styleName="address-container">
              <FormGroup
                headerText="所在城市"
              >
                <InputSelectionCitiesContainer
                  ref={cityAreaInput => (
                    this.cityAreaInput = (cityAreaInput && cityAreaInput.getWrappedInstance())
                  )}
                  cityName={city}
                  areaName={area}
                  value={`${city}${area}`}
                  onSelect={val => dispatchChangeData({
                    city: val.cityName,
                    area: val.areaName,
                  })}
                  constraints={constraints.cityArea}
                  validateOnBlur
                />
              </FormGroup>
            </div>
          </div>
          <FormButton
            colorType="orange"
            content="確認送出"
            onClick={this.onSave}
          />
        </div>
      </div>
    );
  }
}

export default CSS(PublishWish, styles);
