import React from "react";
import styles from "./menu.module.scss";
import { Nav } from "office-ui-fabric-react/lib/Nav";
import { useHistory } from "react-router-dom";

export default function Menu() {

  let history = useHistory();
  const menus = [
    {
      links: [
        {
          name: "待办事项",
          url: "/todo",
          icon: "EventToDoLogo",
          key: "todo"
        }
      ]
    }
  ];

  const _onLinkClick = (ev, item) => {
    history.push(item.url);
    ev.preventDefault();
  }

  return (
    <div className={styles.Menu}>
      <Nav className={styles.Nav} groups={menus} onLinkClick={_onLinkClick} />
    </div>
  );


}
