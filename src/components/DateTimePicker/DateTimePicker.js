import React, { useState, useCallback, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { useTranslation } from 'react-i18next';
import Picker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import hy from 'date-fns/locale/hy';
import CustomInput from './CustomInput';

import { DATE_FORMATS, TIME_FORMATS } from '../../config';

const SMALL_SCREEN_BREAKPOINT = 1280;

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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const calcIsSmallScreen = useCallback(() => {
    // prettier removes the brackets and CRA linter doesn't like that
    // prettier-ignore
    if (isSmallScreen !== (window.innerWidth <= SMALL_SCREEN_BREAKPOINT)) {
      setIsSmallScreen(!isSmallScreen);
    }
  }, [isSmallScreen]);

  useEffect(calcIsSmallScreen, [calcIsSmallScreen]);

  const calcIsSmallScreenWithThrottle = useCallback(
    throttle(calcIsSmallScreen, 200),
    [calcIsSmallScreen],
  ); // throttling prevents running this code too often

  useEffect(() => {
    window.addEventListener('resize', calcIsSmallScreenWithThrottle);
    return () => {
      window.removeEventListener('resize', calcIsSmallScreenWithThrottle);
    };
  }, [calcIsSmallScreenWithThrottle]);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const {
    date,
    setDate,
    type,
    customInput,
    customInputProps,
    onKeyDown,
    inputRef,
    ...rest
  } = props;

  const hasDate = type.toLowerCase()
    .includes('date');
  const hasTime = type.toLowerCase()
    .includes('time');

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
      dateWithOldTime.setHours(hours, minutes),
    );
    setDate(dateWithUpdatedTime);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateTimeChange = (changedDate) => {
    if (!hasDate) {
      return handleTimeChange(changedDate);
    }
    return handleDateChange(changedDate);
  };
  /* eslint react/jsx-props-no-spreading: off */
  return (
    <Picker
      selected={date}
      onChange={handleDateTimeChange}
      dateFormat={FORMATS[type]}
      showTimeSelect={hasTime && !isSmallScreen}
      showTimeSelectOnly={!hasDate}
      showTimeInput={hasTime && !!isSmallScreen}
      timeInputLabel="Time: "
      locale={LOCALES[currentLanguage]}
      customInput={(
        <CustomInputWrapper
          customInput={customInput}
          customInputProps={customInputProps}
          isSmallScreen={isSmallScreen}
          inputRef={inputRef}
        />
      )}
      withPortal={!!isSmallScreen}
      onKeyDown={fixOnEnter}
      {...rest}
    />
  );
};
DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  type: PropTypes.string,
  customInput: PropTypes.elementType,
  customInputProps: PropTypes.objectOf(PropTypes.object),
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.objectOf(PropTypes.object),
};
DateTimePicker.defaultProps = {
  date: new Date(),
  setDate: () => {
  },
  type: 'date',
  customInput: CustomInput,
  customInputProps: {},
  onKeyDown: () => {
  },
  inputRef: null,
};


class CustomInputWrapper extends React.PureComponent {
  render() {
    const {
      customInput: Component,
      customInputProps,
      isSmallScreen,
      inputRef,
      ...inputProps
    } = this.props;

    const fixLabelBubbling = (e) => {
      // makes sure that clicks inside datepicker don't trigger the label again
      if (e.target !== e.currentTarget) {
        e.preventDefault();
      }
    };

    return (
      <label ref={inputRef} onClick={fixLabelBubbling}>
        <Component
          {...customInputProps}
          {...inputProps}
          readOnly={!!isSmallScreen} // prevent keyboard popup on mobile devices
        />
      </label>
    );
  }
}

CustomInputWrapper.propTypes = {
  customInput: PropTypes.element.isRequired,
  customInputProps: PropTypes.objectOf(PropTypes.object).isRequired,
  isSmallScreen: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default DateTimePicker;