import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}
const Card: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

export default Card;
