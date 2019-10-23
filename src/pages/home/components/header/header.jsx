import React from "react";
import styles from "./header.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default function Header() {
  return (
    <div className={styles.Header}>
      <Logo className={styles.Logo} />
      <div>test</div>
    </div>
  );

  function Logo(props) {
    return (
      <span {...props}>
        <span>
          <Icon iconName="VSTSLogo" />
        </span>
        <span>Know how</span>
      </span>
    );
  }
}
