import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}
const Box: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className={styles.box} {...props}>
      {children}
    </div>
  );
};

export default Box;
