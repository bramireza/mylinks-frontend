import React, { HtmlHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  children: JSX.Element | JSX.Element[] | string;
}
const Divider: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className={styles.divider}>
      <hr className={styles.hr} />
      <span className="b1" {...props}>
        {children}
      </span>
      <hr className={styles.hr} />
    </div>
  );
};

export default Divider;
