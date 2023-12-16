import React, { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { formatDateToString } from "@/utils";

interface Props {
  type: string;
  label: string;
  name: string;
  value: string | number | Date;
  isError?: boolean;
  nameError?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: FC<Props> = ({
  type,
  label,
  name,
  value,
  isError = false,
  nameError,
  disabled = false,
  onChange,
}) => {
  return (
    <div className={clsx(styles.container, { [styles.disabled]: disabled })}>
      <div className={styles.textfield}>
        <input
          type={type}
          id={`input-${name}`}
          required
          name={name}
          value={
            type === "date"
              ? formatDateToString(value as Date)
              : (value as string)
          }
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
