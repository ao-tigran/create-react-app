import * as Yup from 'yup';

const appSchema = Yup.object().shape({
  lastName: Yup.string()
    .required(),
  firstName: Yup.string()
    .required(),
});

export default appSchema;