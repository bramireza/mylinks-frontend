import React, { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface Props {
  type: string;
  label: string;
  name: string;
  value: string | number;
  isError?: boolean;
  nameError?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: FC<Props> = ({
  type,
  label,
  name,
  value,
  isError = false,
  nameError,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textfield}>
        <input
          type={type}
          id={`input-${name}`}
          required
          name={name}
          value={value}
          onChange={onChange}
          className={clsx(styles.input, { [styles.error]: isError })}
        />
        <label
          htmlFor={`input-${name}`}
          className={clsx(styles.label, { [styles.focusError]: isError })}
        >
          {label}
        </label>
      </div>
      {isError && <label className={styles.labelError}>{nameError}</label>}
    </div>
  );
};

export default Textfield;
