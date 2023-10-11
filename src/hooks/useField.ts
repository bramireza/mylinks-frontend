import React, { useState } from "react";

interface Props {
  type: string;
}
const useField = ({ type }: Props) => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  return { type, value, onChange };
};

export default useField;
