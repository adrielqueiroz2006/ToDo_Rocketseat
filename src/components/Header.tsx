import React from "react";
import styles from "./Header.module.css";

import todoLogo from "../assets/rocket.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="Logotipo do toDo" />
      <p className={styles.pBlue}>to</p>
      <p className={styles.pDarkPurple}>do</p>
    </header>
  );
}
