import React, { useState } from "react";
import { useAuth } from "./../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import DigitInput from "./../inputs/DigitInput";
import styles from "./index.module.scss";

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  return (
    <div id={styles.home_screen}>
      <h1> {t("home.title")}</h1>
      <p>{`${t("home.welcome")} ${user && user.name}`}</p>
      <button type="button" onClick={logout}>
        {t("logout")}
      </button>
      <LanguageContainer />

      <DigitInput
        name="something"
        value={value}
        onChange={setValue}
        autoComplete="off"
        className="custom"
        placeholder="Digits only"
      />
    </div>
  );
};

export default HomeScreen;
