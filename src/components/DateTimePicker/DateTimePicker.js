import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Picker from 'react-datepicker';
import PropTypes from 'prop-types';
import './stylesheets/datepicker.scss';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import hy from 'date-fns/locale/hy';
import checkMobile from 'ismobilejs';
import parseDate from 'date-fns/parse';

import CustomInput from './CustomInput';

import { DATE_FORMATS, TIME_FORMATS } from '../../config';

const hiddenInput = {
  fontSize: '16px',
  position: 'absolute',
  top: '-9999px',
  left: '-9999px',
};

const DateTimePicker = (props) => {
  const LOCALES = {
    en,
    ru,
    hy,
  };
  const FORMATS = {
    date: DATE_FORMATS,
    time: TIME_FORMATS,
  };

  const hiddenInputRef = useRef(null);

  const [isMobile] = useState(checkMobile(window.navigator.userAgent).any);

  const triggerInput = (ref) => {
    if (!isMobile) {
      return;
    }
    ref.current.focus();
    ref.current.click();
  };

  const handleTouch = () => setTimeout(() => triggerInput(hiddenInputRef), 50);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const {
    date,
    setDate,
    type,
    onKeyDown,
    inputRef,
    inputProps,
    ...rest
  } = props;

  const hasDate = type.toLowerCase().includes('date');
  const hasTime = type.toLowerCase().includes('time');

  const fixOnEnter = (e) => {
    // makes sure input loses focus on enter, to avoid date parsing bugs
    if (e.key.toLowerCase() === 'enter') {
      setTimeout(() => document.activeElement.blur());
    }
    if (onKeyDown) {
      onKeyDown();
    }
  };

  const handleTimeChange = (newTime) => {
    const dateWithOldTime = date ? new Date(date) : new Date();
    const hours = newTime ? newTime.getHours() : 0;
    const minutes = newTime ? newTime.getMinutes() : 0;
    const dateWithUpdatedTime = new Date(
      dateWithOldTime.setHours(hours, minutes, 0),
    );
    return setDate(dateWithUpdatedTime);
  };

  const clearTime = () => handleTimeChange(new Date(new Date().setHours(0, 0, 0)));

  const clearDate = () => setDate(null);

  const handleDateChange = (newDate) => {
    if (!newDate) {
      return clearDate();
    }
    const oldDate = date || new Date();
    const hours = oldDate.getHours();
    const minutes = oldDate.getMinutes();
    const updatedDate = new Date(newDate.setHours(hours, minutes, 0));
    return setDate(updatedDate);
  };

  const handleDateTimeChange = (changedDate) => {
    if (hasTime) {
      return handleTimeChange(changedDate);
    }
    return handleDateChange(changedDate);
  };

  const handleHiddenInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      return hasDate ? clearDate() : clearTime();
    }
    if (hasDate) {
      return handleDateChange(parseDate(value, 'yyyy-MM-dd', new Date()));
    }
    return handleTimeChange(parseDate(value, 'HH:mm', new Date()));
  };

  /* eslint react/jsx-props-no-spreading: off */
  return (
    <>
      <Picker
        selected={date}
        onChange={handleDateTimeChange}
        dateFormat={FORMATS[type]}
        showTimeSelect={hasTime}
        showTimeSelectOnly={hasTime}
        locale={LOCALES[currentLanguage]}
        customInput={(
          <CustomInputWrapper
            isMobile={isMobile}
            inputRef={inputRef}
            inputProps={inputProps}
            handleTouch={handleTouch}
          />
        )}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        onKeyDown={fixOnEnter}
        open={isMobile ? false : undefined} // prevent calendar popup on mobile devices
        {...rest}
      />
      <input
        type={hasDate ? 'date' : 'time'}
        ref={hiddenInputRef}
        onChange={handleHiddenInputChange}
        style={hiddenInput}
        tabIndex="-1"
        aria-hidden="true"
      />
    </>
  );
};
/* eslint react/forbid-prop-types: off */

DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  type: PropTypes.string,
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  inputProps: PropTypes.object,
};
DateTimePicker.defaultProps = {
  date: new Date(),
  setDate: () => {},
  type: 'date',
  onKeyDown: () => {},
  inputRef: null,
  inputProps: {},
};

class CustomInputWrapper extends React.PureComponent {
  render() {
    const {
      isMobile,
      inputRef,
      inputProps,
      handleTouch,
      onClick,
      ...rest
    } = this.props;

    return (
      <CustomInput
        {...inputProps}
        {...rest}
        readOnly={!!isMobile} // prevent keyboard popup on mobile devices
        onClick={isMobile ? handleTouch : onClick}
        inputRef={inputRef}
      />
    );
  }
}

CustomInputWrapper.propTypes = {
  inputProps: PropTypes.object,
  isMobile: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  handleTouch: PropTypes.func,
  onClick: PropTypes.func,
};

CustomInputWrapper.defaultProps = {
  inputProps: {},
  isMobile: false,
  inputRef: null,
  handleTouch: () => {},
  onClick: () => {},
};

export default DateTimePicker;
