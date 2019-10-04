import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from '../DateTimePicker';

const copyTime = (targetDate, dateWithTime) => {
  // return targetDate with time set to dateWithTime
  const hours = dateWithTime.getHours();
  const minutes = dateWithTime.getMinutes();
  return new Date(targetDate.setHours(hours, minutes, 0));
};

const DateRange = (props) => {
  const {
    type,
    minDate,
    maxDate,
    minTime,
    maxTime,
    startDate,
    setStartDate,
    startText,
    endDate,
    setEndDate,
    endText,
  } = props;

  const hasDate = type.toLowerCase().includes('date');
  const hasTime = type.toLowerCase().includes('time');

  const getTimeRange = useCallback(
    (date) => {
      const min = minTime
        ? copyTime(date, minTime)
        : new Date(date.setHours(0, 0, 0));
      const max = maxTime
        ? copyTime(date, maxTime)
        : new Date(date.setHours(23, 59, 0));

      return { min, max };
    },
    [minTime, maxTime],
  );

  const getStartTimeRange = useCallback(() => {
    const currentDate = startDate ? new Date(startDate) : new Date();
    return getTimeRange(currentDate);
  }, [startDate, getTimeRange]);

  const getEndTimeRange = useCallback(() => {
    const currentDate = endDate ? new Date(endDate) : new Date();
    const startDateCopy = startDate ? new Date(startDate) : null;
    const timeRange = getTimeRange(currentDate);

    if (
      startDateCopy
      && currentDate.toDateString() === startDateCopy.toDateString()
      && timeRange.min < startDateCopy
    ) {
      timeRange.min = startDateCopy;
    }

    return timeRange;
  }, [endDate, startDate, getTimeRange]);

  const adjustTimeToRange = (date, range, setDate) => {
    if (!date) return;
    if (date < range.min) {
      setDate(range.min);
      return;
    }
    if (date > range.max) {
      setDate(range.max);
    }
  };

  const adjustStartTime = () => adjustTimeToRange(startDate, getStartTimeRange(), setStartDate);

  const adjustEndTime = () => adjustTimeToRange(endDate, getEndTimeRange(), setEndDate);

  const adjustEndDate = () => {
    if (startDate && endDate && startDate > endDate) {
      setEndDate(startDate);
    }
  };

  const endDateRef = useRef(null);

  const focusOnEndDate = () => {
    if (document.activeElement !== document.body) return; // some element already has focus
    if (endDateRef.current) {
      endDateRef.current.click();
    }
  };

  const manageFocus = () => {
    if (!startDate || endDate) {
      return;
    }
    setTimeout(focusOnEndDate, 50);
  };

  useEffect(manageFocus, [startDate]);
  useEffect(adjustEndDate, [startDate, endDate]);
  useEffect(adjustStartTime, [startDate]);
  useEffect(adjustEndTime, [endDate]);

  return (
    <div className="DateRange">
      <div className="DateRange-start-container">
        {startText ? (
          <div className="DateRange-start-text">{startText}</div>
        ) : null}
        {hasDate ? (
          <div className="DateRange-start-date-input-container">
            <DateTimePicker
              type="date"
              date={startDate}
              minDate={minDate}
              maxDate={maxDate}
              setDate={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onBlur={manageFocus}
              className="DateRange-start-date-input"
            />
          </div>
        ) : null}
        {hasTime ? (
          <div className="DateRange-start-time-input-container">
            <DateTimePicker
              type="time"
              date={startDate}
              minTime={getStartTimeRange().min}
              maxTime={getStartTimeRange().max}
              setDate={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onBlur={!hasDate ? manageFocus : () => undefined}
              className="DateRange-start-time-input"
            />
          </div>
        ) : null}
      </div>
      <div className="DateRange-end-container">
        {endText ? <div className="DateRange-end-text">{endText}</div> : null}
        {hasDate ? (
          <div className="DateRange-end-date-input-container">
            <DateTimePicker
              type="date"
              date={endDate}
              minDate={startDate || minDate}
              maxDate={maxDate}
              setDate={setEndDate}
              inputRef={endDateRef}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="DateRange-end-date-input"
            />
          </div>
        ) : null}
        {hasTime ? (
          <div className="DateRange-end-time-input-container">
            <DateTimePicker
              type="time"
              date={endDate}
              minTime={getEndTimeRange().min}
              maxTime={getEndTimeRange().max}
              setDate={setEndDate}
              inputRef={!hasDate ? endDateRef : null}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="DateRange-end-time-input"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

DateRange.propTypes = {
  type: PropTypes.oneOf(['date', 'time', 'datetime']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minTime: PropTypes.instanceOf(Date),
  maxTime: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
  startText: PropTypes.string,
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func,
  endText: PropTypes.string,
};

DateRange.defaultProps = {
  type: 'date',
  startDate: null,
  setStartDate: () => undefined,
  endDate: null,
  setEndDate: () => undefined,
  minDate: null,
  maxDate: null,
  minTime: null,
  maxTime: null,
  startText: '',
  endText: '',
};

export default DateRange;
