import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageContainer from "./../LanguageContainer";
import DigitInput from "./../inputs/DigitInput";
import styles from "./index.module.scss";
import { Header } from "semantic-ui-react";

const HomeScreen = props => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  return (
    <div id={styles.home_screen}>
      <h1> {t("home.title")}</h1>
      <Header as="h3" textAlign="center" content="Semantic UI React integrated"/>
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
