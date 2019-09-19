import React from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import Validation from '../Validation';
import appSchema from '../../validations/app';
import GlobalError from '../GlobalError';
import styles from './index.module.scss';

const LoginScreen = () => {
  const { authenticate } = useAuth();
  const { t } = useTranslation();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: appSchema(),
    mode: 'onBlur',
  });

  const onSubmit = (data) => authenticate({ username: data.username, password: data.password });

  return (
    <div id={styles.login_screen}>

      <GlobalError />

      <div className={styles.login_body}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.login_input}>
            <label htmlFor="username" className={styles.login_label}>
              {t('login.username')}
            </label>
            <Validation name="username" showMessage errors={errors}>
              <input name="username" type="text" ref={register} autoComplete="off" />
            </Validation>
          </div>
          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              {t('login.password')}
            </label>
            <Validation name="password" showMessage errors={errors}>
              <input name="password" type="password" ref={register} autoComplete="off" />
            </Validation>
          </div>
          <div className={styles.login_submit}>
            <button type="submit" value="Submit">
              <p>{t('login.login')}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
