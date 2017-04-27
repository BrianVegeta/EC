import React from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputTitle from './InputTitle';
import TextareaDescription from './TextareaDescription';
import InputTags from './InputTags';

const Container = () => (
  <div styleName="container">
    <InputTitle styleName="inputGroup" />
    <TextareaDescription styleName="inputGroup" />
    <InputTags styleName="inputGroup" />
  </div>
);

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(Container, styles));
