import React, { useCallback, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

import "./index.scss";
import DiscordIcon from "../DiscordIcon";

type DiscordInputFieldProps = {
  value: string;
  onValueChange?: (value: string) => void;
  displayValue?: string;
  placeholder?: string;
  isLoading?: boolean;
  required?: boolean;
  readOnly?: boolean;
  iconUrl?: string;
  isError?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;
};

const DiscordInputField: React.FC<DiscordInputFieldProps> = ({
  value,
  onValueChange,
  isLoading,
  displayValue,
  readOnly,
  required,
  placeholder,
  iconUrl,
  onFocus,
  onBlur,
}) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const onInputFocus = useCallback(() => {
    setIsInputFocused(true);

    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const onInputBlur = useCallback(() => {
    setIsInputFocused(false);

    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  const shouldShowDisplayValue = !isInputFocused && displayValue;

  return (
    <div className={"discord-input-wrapper"}>
      <div className="discord-input-overlay">
        <div className="discord-input-icon-container">
          {isLoading ? (
            <LoadingSpinner />
          ) : iconUrl ? (
            <img src={iconUrl} />
          ) : (
            <span>?</span>
          )}
        </div>
        <DiscordIcon />
      </div>
      <input
        className={`discord-input-field ${!shouldShowDisplayValue ? "discord-input-field__mono" : ""}`}
        disabled={readOnly}
        required={required}
        placeholder={placeholder}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value);
        }}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={shouldShowDisplayValue ? displayValue : value}
      />
    </div>
  );
};

export default DiscordInputField;
