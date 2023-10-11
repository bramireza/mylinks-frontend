import React, { HtmlHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { clsx } from "clsx";

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  children: JSX.Element | JSX.Element[] | string;
  href: string;
  fullWidth?: boolean;
}
const Link: React.FC<Props> = ({
  children,
  href,
  fullWidth = false,
  ...props
}) => {
  return (
    <a
      href={href}
      className={clsx(styles.link, { [styles.fullWidth]: fullWidth })}
    >
      <span className="b1" {...props}>
        {children}
      </span>
    </a>
  );
};

export default Link;
