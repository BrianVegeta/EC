import React from 'react';

import InputTextArea from 'components/Input/TextArea';
import FormGroup from 'components/Form/Group';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints/publish';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class ScoreRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 1,
      description: '',
    };
  }

  onSave() {
    const isValid = this.descriptionInput.valid();
    if (isValid) {
      console.log('EXCUTE');
      return;
    }
    console.log('NOT VALID');
  }

  render() {
    const { description } = this.state;
    return (
      <div>
        <FormGroup
          headerText={'評語'}
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
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
        <div>star rating</div>
      </div>
    );
  }
}

export default CSS(ScoreRating, styles);
