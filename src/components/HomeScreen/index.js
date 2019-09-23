import React, { useContext, useState } from "react";
import AuthContext from "./../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import DigitInput from "./../inputs/DigitInput";
import styles from "./index.module.scss";

const HomeScreen = () => {
  const { user, logout, isLoading } = useContext(AuthContext);
  const { t } = useTranslation();

  const [value, setValue] = useState("");

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

      <DigitInput
        name="something"
        withPeriod={true}
        value={value}
        setValue={setValue}
        autoComplete="off"
        className="custom"
      />
    </div>
  );
};

export default HomeScreen;
