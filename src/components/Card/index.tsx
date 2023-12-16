import React, { HtmlHTMLAttributes } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface Props extends HtmlHTMLAttributes<HTMLDivElement>{
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}
const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
