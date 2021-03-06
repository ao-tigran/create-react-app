import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageContainer from '../LanguageContainer';
import DateTimePicker from '../DateTimePicker';
import styles from './index.module.scss';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [date, setDate] = useState(null);

  return (
    <div id={styles.home_screen}>
      <h1>{t('home.title')}</h1>
      <p>{`${t('home.welcome')} ${user && user.name}`}</p>
      <button type="button" onClick={logout}>
        {t('logout')}
      </button>
      <LanguageContainer />

      <DateTimePicker
        date={date}
        setDate={setDate}
        inputProps={{
          icon: 'calendar',
        }}
        minDate={new Date(2019, 9, 1)}
        maxDate={new Date(2019, 11, 1)}
      />

      <DateTimePicker
        type="time"
        date={date}
        setDate={setDate}
        inputProps={{
          icon: 'clock',
        }}
      />

      <p>
        Chosen date:
        {date ? date.toString() : 'None'}
        {' '}
      </p>
    </div>
  );
};

export default HomeScreen;
