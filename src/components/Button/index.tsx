import React, { HtmlHTMLAttributes, MouseEventHandler } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  children: JSX.Element | JSX.Element[] | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button' | undefined;
  fullWidth?: boolean;
}
const Button: React.FC<Props> = ({
  children,
  onClick,
  type,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, { [styles.fullWidth]: fullWidth })}
      onClick={onClick}
    >
      <span className="b1" {...props}>
        {children}
      </span>
    </button>
  );
};

export default Button;
