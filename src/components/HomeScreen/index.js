import React, { useContext } from "react";
import AuthContext from "./../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import styles from "./index.module.scss";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div id={styles.home_screen}>
      <h1> {t("home.title")}</h1> <p>{`Welcome ${user && user.name}`}</p>
      <button type="button" onClick={logout}>
        {t("logout")}
      </button>
      <LanguageContainer />
    </div>
  );
};

export default HomeScreen;
