import React from 'react';
import logo from '../../styles/svgs/logo.svg';
import appSchema from '../../validations/app';
import useForm from 'react-hook-form';

import styles from './index.module.scss';

function App() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: appSchema,
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

        <input name="firstName" type="text" ref={register}></input>
        {errors.firstName && 'First name is required.'}

        <br/>

        <input name="lastName" type="text" ref={register}></input>
        {errors.lastName && 'Last name is required.'}

        <br />

        <input type="submit"/>
      </header>
    </form>
  );
}

export default App;
