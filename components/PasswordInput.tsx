"use client";

import { useId, useState } from "react";

type PasswordInputProps = {
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  placeholder?: string;
};

export function PasswordInput({
  name,
  label,
  required = false,
  minLength,
  autoComplete,
  placeholder,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = useId();

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <div className="password-input">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
