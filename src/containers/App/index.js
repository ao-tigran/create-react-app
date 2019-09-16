import React from 'react';
import logo from '../../styles/svgs/logo.svg';
import appSchema from '../../validations/app';
import useForm from 'react-hook-form';
import Validation from '../../components/Validation';

import styles from './index.module.scss';

function App() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: appSchema,
    mode: 'onBlur',
  });

  const onSubmit = data => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.app}>
      <header className={styles.app_header}>
        <img src={logo} className={styles.app_logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.app_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <br />

        <Validation name="firstName" showMessage={true} errors={errors}>
          <input className={styles.lol} name="firstName" type="text" ref={register}></input>
        </Validation>

        <br/>

        <Validation name="lastName" showMessage={true} errors={errors}>
          <input name="lastName" type="text" ref={register}></input>
        </Validation>

        <br />

        <input type="submit"/>
      </header>
    </form>
  );
}

export default App;
