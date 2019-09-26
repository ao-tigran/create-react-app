import React from "react";
import { useTranslation } from "react-i18next";

const Currency = props => {
  const { value, showType, showSymbol, type, currencyClass } = props;
  const { t } = useTranslation();

  const formattedCurrency = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 5
  }).format(value);

  return (
    <div style={currencyClass}>
      <p>
        {showType ? type === "AMD" ? <span> ֏ </span> : <span> $ </span> : null}
        {formattedCurrency}
        {showSymbol ? <span> {t("currency.AMD")}</span> : null}
      </p>
    </div>
  );
};

export default Currency;
