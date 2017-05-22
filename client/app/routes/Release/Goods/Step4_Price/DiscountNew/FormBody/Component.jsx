import React, { PropTypes } from 'react';
import FormGroup from '../../../components/FormGroup';
import InputCounter from '../../../components/InputCounter';
import InputUnit from '../../../components/InputUnit';
import SelectionCategory from '../../../components/SelectionCategory';
import { fetchCategories } from '../../../../../actions/itemsActions';

class FormBody extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const headerTextStyle = {
      fontSize: 18,
      fontWeight: 300,
    };
    const groupHalfStyle = {
      width: '50%',
      display: 'inline-block',
    };
    return (
      <div>
        <FormGroup
          headerText="一次租用天數"
          groupStyle={{
            ...groupHalfStyle,
            paddingRight: 10,
          }}
          headerTextStyle={headerTextStyle}
        >
          <InputCounter value={1} suffix="天" />
        </FormGroup>
        <FormGroup
          headerText="優惠折扣"
          groupStyle={{
            ...groupHalfStyle,
            paddingLeft: 10,
          }}
          headerTextStyle={headerTextStyle}
        >
          <InputUnit placeholder="如：95折" suffix="折" />
        </FormGroup>
        <FormGroup
          headerText="選擇常用的分類"
          headerTextStyle={headerTextStyle}
        >
          <SelectionCategory categories={this.props.items.categories.goods} />
        </FormGroup>
      </div>
    );
  }
}
// TODO: categories goods
export default FormBody;
