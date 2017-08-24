export default function SimpleInput({ ...data }, dispatch, dispatchAction) {
  return class {
    constructor(stateName) {
      this.stateName = stateName;
      this.props = { dispatch, ...data };

      this.value = data[stateName];
      this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
      this.props.dispatch(
        dispatchAction({ [this.stateName]: value }),
      );
    }
  };
}
