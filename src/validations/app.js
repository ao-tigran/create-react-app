import * as Yup from 'yup';

const appSchema = Yup.object().shape({
  lastName: Yup.string()
    .required('This field is required'),
  firstName: Yup.string()
    .required('This field is required'),
});

export default appSchema;