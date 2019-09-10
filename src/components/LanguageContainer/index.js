import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LanguageContainer = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      <div onClick={() => changeLanguage('en')}>{t('en')}</div>
      <div onClick={() => changeLanguage('hy')}>{t('hy')}</div>
      <div onClick={() => changeLanguage('ru')}>{t('ru')}</div>
    </div>
  )
}

export default LanguageContainer;