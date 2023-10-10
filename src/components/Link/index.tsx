import React, { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: JSX.Element | JSX.Element[] | string;
}
const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <a {...props} className={styles.link}>
      <span className="b1">{children}</span>
    </a>
  );
};

export default Link;
