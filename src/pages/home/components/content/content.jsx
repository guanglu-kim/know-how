import React from "react";
import styles from "./content.module.scss";
import { Switch, Route } from "react-router-dom";
import Todo from "../../../todo/todo";

export default function Content() {
  return (
    <div className={styles.Content}>
        <Switch>
          <Route path="/todo">
            <Todo />
          </Route>
        </Switch>
    </div>
  );
}
