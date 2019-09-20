import React, { useState } from "react";
import { useAuth } from "./../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const LoginScreen = props => {
  const { authenticate, isLoading, error } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault();
    authenticate({ username, password });
  };

  return (
    <div id={styles.login_screen}>
      <div className={styles.login_body}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.login_input}>
            <label htmlFor="username" className={styles.login_label}>
              {t("login.username")}
            </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              {t("login.password")}
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          {error && (
            <div>
              <strong>{error.message}</strong>
            </div>
          )}
          <div className={styles.login_submit}>
            <button type="submit" value="Submit" disabled={isLoading}>
              <p>{t("login.login")}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
