import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageContainer from '../LanguageContainer';
import DigitInput from '../inputs/DigitInput';
import DateRange from '../DateRange';
import styles from './index.module.scss';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);

  return (
    <div id={styles.home_screen}>
      <h1>{t('home.title')}</h1>
      <p>{`${t('home.welcome')} ${user && user.name}`}</p>
      <button type="button" onClick={logout}>
        {t('logout')}
      </button>
      <LanguageContainer />

      <h3>Date Range</h3>
      <DateRange
        type="date"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <div>
        <span>
          Start:
          {startDate && startDate.toString()}
        </span>
      </div>
      <div>
        <span>
          End:
          {endDate && endDate.toString()}
        </span>
      </div>
      <hr />
      <h3>Time Range</h3>
      <DateRange
        type="time"
        startDate={startDate1}
        setStartDate={setStartDate1}
        endDate={endDate1}
        setEndDate={setEndDate1}
      />
      <div>
        <span>
          Start:
          {startDate1 && startDate1.toString()}
        </span>
      </div>
      <div>
        <span>
          End:
          {endDate1 && endDate1.toString()}
        </span>
      </div>
      <hr />
      <h3>Date-Time Range</h3>
      <DateRange
        type="datetime"
        startDate={startDate2}
        startText="Starting from: "
        setStartDate={setStartDate2}
        endDate={endDate2}
        endText="Until : "
        setEndDate={setEndDate2}
        minDate={new Date('10/01/2019')}
        maxDate={new Date('11/15/2019')}
        minTime={new Date(new Date().setHours(9, 0, 0))}
        maxTime={new Date(new Date().setHours(18, 0, 0))}
      />
      <div>
        <span>
          Start:
          {startDate2 && startDate2.toString()}
        </span>
      </div>
      <div>
        <span>
          End:
          {endDate2 && endDate2.toString()}
        </span>
      </div>
      <hr />

      <DigitInput
        name="something"
        value={value}
        onChange={setValue}
        autoComplete="off"
        className="custom"
        placeholder="Digits only"
      />
    </div>
  );
};

export default HomeScreen;
