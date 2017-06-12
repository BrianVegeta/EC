import { TITLE, PATH } from '../constants';
import Model from '../Model';


export default (publish, dispatch) => {
  const { progress } = publish;
  const isCoverValid = publish.coverThumbs.length > 0;
  const model = new Model(publish, dispatch);
  return [
    {
      text: TITLE.UPLOAD_COVER,
      link: PATH.STEP_1_COVER_INDEX,
      isValid: isCoverValid,
      isTouched: !!progress.STEP_1_COVER_INDEX,
    },
    {
      text: TITLE.ABOUT,
      link: PATH.STEP_2_ABOUT,
      isValid: model.isStep2Valid,
      isTouched: !!progress.STEP_2_ABOUT,
    },
    {
      text: TITLE.DELIVERY,
      link: PATH.STEP_3_DELIVERY,
      isValid: false,
      isTouched: !!progress.STEP_3_DELIVERY,
    },
    {
      text: TITLE.PRICE,
      link: PATH.STEP_4_PRICE,
      isValid: false,
      isTouched: !!progress.STEP_4_PRICE,
    },
    {
      text: TITLE.REGULATION,
      link: PATH.STEP_5_REGULATION,
      isValid: false,
      isTouched: !!progress.STEP_5_REGULATION,
    },
    {
      text: TITLE.CANCEL_POLICY,
      link: PATH.STEP_6_CANCEL_POLICY,
      isValid: false,
      isTouched: !!progress.STEP_6_CANCEL_POLICY,
    },
    {
      text: TITLE.CONFIRM,
      link: PATH.STEP_7_CONFIRM,
      isValid: false,
      isTouched: !!progress.STEP_7_CONFIRM,
    },
  ];
};
