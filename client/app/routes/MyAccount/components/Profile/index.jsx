import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { Link } from 'react-router';
import Icon from 'react-icons/lib/md/assignment-ind';

import {
  userprofilePaths as userprofileRouter,
} from 'lib/paths';
import TableForm, { TableRow } from 'components/TableForm';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints/profile';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Container from '../Container';


const cx = classnames.bind(styles);
class Profile extends React.Component {

  static propTypes = {
    currentUser: myPropTypes.currentUser.isRequired,
    profile: PropTypes.shape({
      data: PropTypes.object,
    }).isRequired,
    dispatchUpdateUserprofile: PropTypes.func.isRequired,
    dispatchFetchUserprofile: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchFetchUserprofile();
  }

  render() {
    const {
      dispatchChangeData,
      dispatchUpdateUserprofile,
      currentUser: { uid },
      profile: {
        data: {
          picture,
          name,
          city,
          area,
          occupation,
          website,
          autobiography,
        },
      },
    } = this.props;
    const refName = input => (this.nameInput = input);
    const refCityArea = input => (
      this.cityAreaInput = (input && input.getWrappedInstance())
    );
    const refOccupation = input => (this.occupationInput = input);
    const refWebsite = input => (this.websiteInput = input);
    const refAutobiography = input => (this.autobiographyInput = input);
    return (
      <Container titleText="公開資訊" icon={Icon} >
        <Link
          className="button"
          styleName="userprofile-link"
          to={userprofileRouter.indexPath(uid)}
        >
          查看個人頁面
        </Link>
        <TableForm className={cx('form-container')}>
          <TableRow labelWidth={100}>
            <span styleName="label">個人照片</span>
            <div styleName="input-container">
              <div styleName="avatar">
                <Avatar src={picture} />
              </div>
              <FormButton
                content="上傳照片"
                colorType="greenBorder"
                size="sm"
                width="auth"
                style={{ verticalAlign: 'middle' }}
                onClick={() => console.log('upload')}
              />
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">暱稱</span>
            <div styleName="input-container">
              <div styleName="limit">
                <FormTitleLimiter limit={30} length={name.length} />
              </div>
              <InputText
                ref={refName}
                placeholder="請輸入暱稱"
                value={name}
                onChange={value => dispatchChangeData({ name: value })}
                constraints={constraints.nickname}
                validateOnBlur
              />
              <div styleName="limit">&nbsp;</div>
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">所在城市</span>
            <div styleName="input-container">
              <InputSelectionCitiesContainer
                ref={refCityArea}
                cityName={city}
                areaName={area}
                value={`${city}${area}`}
                onSelect={({ cityName, areaName }) => dispatchChangeData({
                  city: cityName,
                  area: areaName,
                })}
                constraints={constraints.cityArea}
                validateOnBlur
              />
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">職業</span>
            <div styleName="input-container">
              <InputText
                ref={refOccupation}
                placeholder="請輸入職業"
                value={occupation}
                onChange={value => dispatchChangeData({ occupation: value })}
                constraints={constraints.occupation}
                validateOnBlur
              />
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">網站</span>
            <div styleName="input-container">
              <InputText
                ref={refWebsite}
                placeholder="www"
                value={website}
                onChange={value => dispatchChangeData({ website: value })}
                constraints={constraints.website}
                validateOnBlur
              />
            </div>
          </TableRow>
          <TableRow>
            <span
              styleName="label"
              style={{ display: 'inline-block', height: 105 }}
            >
              自我介紹
            </span>
            <div styleName="input-container">
              <div styleName="limit">
                <FormTitleLimiter limit={150} length={autobiography.length} />
              </div>
              <InputTextArea
                ref={refAutobiography}
                minHeight={150}
                placeholder="介紹您自己"
                onChange={value => dispatchChangeData({ autobiography: value })}
                value={autobiography}
                constraints={constraints.autobiography}
                validateOnBlur
              />
            </div>
          </TableRow>
        </TableForm>
        <FormButton
          content="儲存"
          colorType="orange"
          style={{ padding: '12px 50px' }}
          width="auto"
          onClick={dispatchUpdateUserprofile}
        />
      </Container>
    );
  }
}

export default CSS(Profile, styles);
