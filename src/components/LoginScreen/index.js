import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthContext from './../../context/AuthContext';
import { API_URL } from './../../config';
import { setToken } from './../../helpers/auth';
import { Button, Icon, Input } from 'semantic-ui-react';
import styles from './index.module.scss';

class LoginScreen extends Component {
  static contextType = AuthContext;

  handleSubmit = values => {
    const { authenticate } = this.context;

    axios
      .post(`${API_URL}/auth`, {
        ...values,
      })
      .then(res => {
        setToken(res.headers.authorization);
        authenticate({ user: res.data.result });
      })
      .catch(err => {
        console.log('err', err);
        authenticate({ error: err });
      });
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={this.handleSubmit}
        validationSchema={LoginValidationSchema}
        render={props => (
          <div id={styles.login_screen}>
            <div className={styles.login_body}>
              <Form>
                <div className={styles.login_input}>
                  <label htmlFor="username" className={styles.login_label}>
                    Login
                  </label>
                  <Input
                    name="username"
                    iconPosition="left"
                    placeholder="Login name"
                    onChange={props.handleChange}
                  >
                    <Icon className={styles.user_icon} />
                    <input />
                  </Input>
                  <div className={styles.errors}>
                    <ErrorMessage name="username" />
                  </div>
                </div>

                <div className={styles.login_input}>
                  <label htmlFor="password" className={styles.login_label}>
                    Password
                  </label>
                  <Input
                    name="password"
                    type="password"
                    iconPosition="left"
                    placeholder="Password"
                    onChange={props.handleChange}
                  >
                    <Icon className={styles.password_icon} />
                    <input />
                  </Input>
                  <div className={styles.errors}>
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className={styles.login_submit}>
                  <Button
                    type="submit"
                    value="Submit"
                    className={styles.login_btn}
                  >
                    Log in
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      />
    );
  }
}

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Login name is required'),
  password: Yup.string().required('Password is required'),
});

export default LoginScreen;
