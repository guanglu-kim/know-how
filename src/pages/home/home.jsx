import React from "react";
import styles from "./home.module.scss";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Content from "./components/content/content";
import { BrowserRouter as Router } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.Home}>
      <Header />
      <div className={styles.content}>
        <Router>
          <Menu />
          <Content />
        </Router>
      </div>
    </div>
  );
}
