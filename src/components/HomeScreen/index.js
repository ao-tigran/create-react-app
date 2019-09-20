import React, { useContext } from "react";
import AuthContext from "./../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import styles from "./index.module.scss";

const HomeScreen = () => {
  const { user, logout, isLoading } = useContext(AuthContext);
  const { t } = useTranslation();

  if (isLoading) {
    return null;
  }

  return (
    <div id={styles.home_screen}>
      <h1> {t("home.title")}</h1>

      <p>{`${t("home.welcome")} ${user.username}`}</p>
      <button type="button" onClick={logout}>
        {t("logout")}
      </button>
      <LanguageContainer />
    </div>
  );
};

export default HomeScreen;
