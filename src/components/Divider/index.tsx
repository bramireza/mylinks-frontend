import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}
const Divider: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.divider}>
      <hr className={styles.hr} />
      <span className="b1">{children}</span>
      <hr className={styles.hr} />
    </div>
  );
};

export default Divider;
