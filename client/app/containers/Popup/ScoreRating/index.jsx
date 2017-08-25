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
  static defaultProps = {
    targetScore: 1,
    targetComment: '',
  }

  static propTypes = {
    dispatchClosePopup: PropTypes.func.isRequired,
    onScore: PropTypes.func.isRequired,
    isView: PropTypes.bool.isRequired,
    targetScore: PropTypes.number,
    targetComment: PropTypes.string,
    targetName: PropTypes.string.isRequired,
    targetUrl: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      score: props.targetScore,
      description: props.targetComment,
    };
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const isValid = this.descriptionInput.valid();
    if (isValid) {
      this.props.onScore(this.state.score, this.state.description);
      this.props.dispatchClosePopup();
      return;
    }
    alert('請輸入評價！！');
  }

  render() {
    const { description } = this.state;
    const { targetUrl, targetName } = this.props;
    return (
      <div>
        <div styleName="title-section">評價</div>
        <div styleName="photo-section">
          <Avatar
            src={targetUrl}
          />
        </div>
        <div
          className="clear"
          styleName="name-section">
          {targetName}
        </div>
        <div styleName="star-section">
          <ReactStars
            count={5}
            value={this.state.score}
            onChange={(value) => { this.state.score = value; }}
            half={false}
            size={30}
            edit={!(this.props.isView)}
            color1={'#DBDBDB'}
            color2={'#31ABBA'}
          />
        </div>
        <div styleName="comment-section">
          { this.props.isView ?
            <div styleName="comment-text">{this.state.description}</div>
            :
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
          }
        </div>
        <div styleName="action-section">
          <div styleName="left-button">
            <FormButton
              colorType="greenBorder"
              size="sm"
              width={150}
              content={this.props.isView ? '確定' : '取消'}
              onClick={this.props.dispatchClosePopup}
            />
          </div>
          { !(this.props.isView) &&
            <div styleName="right-button">
              <FormButton
                colorType="green"
                size="sm"
                width={150}
                content="確定"
                onClick={this.onSave}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default CSS(ScoreRating, styles);
