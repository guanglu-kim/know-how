import React from "react";
import styles from "./content.module.scss";
import { Switch, Route } from "react-router-dom";
import Todo from "../../../todo/todo";
import Naotu from "../../../naotu/naotu";

export default function Content() {
  return (
    <div className={styles.Content}>
      <Switch>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/naotu">
          <Naotu />
        </Route>
      </Switch>
    </div>
  );
}
