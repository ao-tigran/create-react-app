import * as Yup from 'yup';

const appSchema = () => Yup.object().shape({
  username: Yup.string()
    .required('isRequired'),
  password: Yup.string()
    .required('isRequired'),
});

export default appSchema;
