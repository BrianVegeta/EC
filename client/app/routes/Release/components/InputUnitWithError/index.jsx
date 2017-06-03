// <InputUnit
//   value={1}
//   suffix="天" max={100} min={1}
//   width={150}
//   onChange={func}
//   placeholder="Enter..."
// />
import InputUnit from '../InputUnit';
import InputWithError from '../InputWithError';

export default InputWithError(InputUnit);
