import React from "react";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import styles from "./index.module.scss";

const HomeScreen = props => {
  const { t } = useTranslation();
  return (
    <div id={styles.home_screen}>
      <h1> {t("home.title")}</h1>
      <LanguageContainer />
    </div>
  );
};

export default HomeScreen;
