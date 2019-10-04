import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DEFAULT_CURRENCY } from '../../config';

const Currency = (props) => {
  let { currency } = props;
  const { value, withCurrencyLabel, withSymbol, fractionDigits } = props;

  const { t } = useTranslation();

  const amd = 'AMD';
  const usd = 'USD';

  currency = currency || DEFAULT_CURRENCY;

  const formattedCurrency = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

  const getSymbol = () => {
    switch (currency) {
      case amd:
        return '֏';
      case usd:
        return '$';
      default:
        return '$';
    }
  };

  const getLabel = () => {
    switch (currency) {
      case amd:
        return t('currency.AMD');
      case usd:
        return t('currency.USD');
      default:
        return t('currency.USD');
    }
  };

  return (
    <div>
      <p>
        {withSymbol && (
          <span>
            {getSymbol()}
          </span>
        )}
        {formattedCurrency}
        {withCurrencyLabel && (
          <span>
            {getLabel()}
          </span>
        )}
      </p>
    </div>
  );
};

Currency.propTypes = {
  currency: PropTypes.string,
  value: PropTypes.number,
  withCurrencyLabel: PropTypes.string,
  withSymbol: PropTypes.string,
  fractionDigits: PropTypes.number,
};

Currency.defaultProps = {
  currency: 'AMD',
  value: 0,
  withCurrencyLabel: '',
  withSymbol: '',
  fractionDigits: 0,
};

export default Currency;
