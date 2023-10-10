import React, { HtmlHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface Props extends HtmlHTMLAttributes<HTMLPictureElement> {
  src: string;
  alt: string;
}
const Image: React.FC<Props> = ({ src, alt, ...props }) => {
  return (
    <picture {...props}>
      <img src={src} className={styles.img} alt={alt} />
    </picture>
  );
};

export default Image;
