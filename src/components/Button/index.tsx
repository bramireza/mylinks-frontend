import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";
import styles from "./styles.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | JSX.Element[] | string;
  onClick?: MouseEventHandler<HTMLButtonElement> ;
}
const Button: React.FC<Props> = ({ children, onClick, ...props }) => {
  return (
    <button {...props} className={styles.button} onClick={onClick}>
      <span className="b1">{children}</span>
    </button>
  );
};

export default Button;
