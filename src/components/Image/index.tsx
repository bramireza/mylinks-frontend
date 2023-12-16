import React, { HtmlHTMLAttributes } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  rounded?: boolean;
}
const Image: React.FC<Props> = ({ src, alt, rounded = false, ...props }) => {
  return (
    <picture className={styles.picture} {...props}>
      <img
        className={clsx(styles.img, { [styles.rounded]: rounded })}
        src={src}
        alt={alt}
        title={alt}
      />
    </picture>
  );
};

export default Image;
