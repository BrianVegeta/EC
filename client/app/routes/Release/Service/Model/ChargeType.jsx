// @@ service
class ChargeType {
  constructor(chargeType, dispatch) {
    this.value = chargeType;
  }
  is(chargeType) {
    return this.value === chargeType;
  }
}
export default ChargeType;
