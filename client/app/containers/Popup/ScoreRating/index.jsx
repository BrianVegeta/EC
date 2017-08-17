import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar';
import InputTextArea from 'components/Input/TextArea';
import FormGroup from 'components/Form/Group';
import FormButton from 'components/FormButton';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints/publish';
import ReactStars from 'react-stars';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class ScoreRating extends React.Component {
  static propTypes = {
    dispatchClosePopup: PropTypes.func.isRequired,
    onScore: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      score: 5,
      description: '',
    };
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const isValid = this.descriptionInput.valid();
    if (isValid) {
      console.log('EXCUTE');
      this.props.onScore(this.state.score, this.state.description);
      this.props.dispatchClosePopup();
      return;
    }
    alert('請輸入評價！！');
  }

  render() {
    const { description } = this.state;
    return (
      <div>
        <div styleName="score-rating-title-section">評價</div>
        <div styleName="score-rating-photo-section">
          <Avatar
            src={'https://shareapisd.s3.amazonaws.com/SACAW0X1_1500531998767_profile.jpg'}
          />
        </div>
        <div
          className="clear"
          styleName="score-rating-name-section">
          漩渦鳴人
        </div>
        <div styleName="score-rating-star-section">
          <ReactStars
            count={5}
            value={this.state.score}
            onChange={(value) => { this.state.score = value; }}
            half={false}
            size={30}
            color1={'#DBDBDB'}
            color2={'#31ABBA'}
          />
        </div>
        <div styleName="score-rating-comment-section">
          <FormGroup
            headerText={'您的評語'}
            limiter={<FormTitleLimiter limit={250} length={description.length} />}
          >
            <InputTextArea
              ref={descriptionInput => (this.descriptionInput = descriptionInput)}
              placeholder="留下評語"
              onChange={value => this.setState({ description: value })}
              value={description}
              constraints={constraints.descript}
              validateOnBlur
            />
          </FormGroup>
        </div>
        <div styleName="score-rating-action-section">
          <div styleName="score-rating-left-button">
            <FormButton
              colorType="greenBorder"
              size="sm"
              width={150}
              content="取消"
              onClick={this.props.dispatchClosePopup}
            />
          </div>
          <div styleName="score-rating-right-button">
            <FormButton
              colorType="green"
              size="sm"
              width={150}
              content="確定"
              onClick={this.onSave}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ScoreRating, styles);
