import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Picker from 'react-datepicker';
import PropTypes from 'prop-types';
import './react-datepicker.css';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import hy from 'date-fns/locale/hy';
import CustomInput from './CustomInput';

import { DATE_FORMATS, TIME_FORMATS } from '../../config';

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

  const [isMobile, setIsMobile] = useState(false);

  const confirmMobile = () => setIsMobile(true);

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
      showTimeSelect={hasTime && !isMobile}
      showTimeSelectOnly={!hasDate}
      showTimeInput={hasTime && !!isMobile}
      timeInputLabel="Time: "
      locale={LOCALES[currentLanguage]}
      customInput={(
        <CustomInputWrapper
          isMobile={isMobile}
          inputRef={inputRef}
          onTouchStart={confirmMobile}
          inputProps={inputProps}
        />
      )}
      withPortal={isMobile}
      shouldCloseOnSelect={!isMobile}
      onKeyDown={fixOnEnter}
      {...rest}
    />
  );
};

// TODO: update proptypes and default props
DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  type: PropTypes.string,
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.objectOf(PropTypes.object),
  inputProps: PropTypes.objectOf(PropTypes.object),
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
    const { isMobile, inputRef, inputProps, ...rest } = this.props;

    const fixLabelBubbling = (e) => {
      // makes sure that clicks inside datepicker don't trigger the label again
      if (e.target !== e.currentTarget) {
        e.preventDefault();
      }
    };

    return (
      <label ref={inputRef} onClick={fixLabelBubbling}>
        <CustomInput
          {...inputProps}
          {...rest}
          readOnly={!!isMobile} // prevent keyboard popup on mobile devices
        />
      </label>
    );
  }
}

CustomInputWrapper.propTypes = {
  inputProps: PropTypes.objectOf(PropTypes.object).isRequired,
  isMobile: PropTypes.bool.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default DateTimePicker;
