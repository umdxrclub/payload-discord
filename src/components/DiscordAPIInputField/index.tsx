import React, { useCallback, useEffect, useState } from "react";
import DiscordInputField from "../DiscordInputField";

export type APIData = {
  displayName?: string;
  iconUrl?: string;
};

export type APIDataFetcher = (value: string) => Promise<APIData | null>;

type APIDataWithID = APIData & {
  id: string;
};

type DiscordAPIInputFieldProps = {
  value: string;
  onValueChange?: (newValue: string) => void;
  fetchData: APIDataFetcher;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
};

const DiscordAPIInputField: React.FC<DiscordAPIInputFieldProps> = ({
  value,
  onValueChange,
  fetchData,
  required,
  readOnly,
  placeholder,
}) => {
  const [data, setData] = useState<APIDataWithID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refresh = useCallback(() => {
    setData(null);
    setIsLoading(true);

    let valueToFetch = value;
    fetchData(valueToFetch).then((data) => {
      setIsLoading(false);
      setData(
        data
          ? {
              id: valueToFetch,
              ...data,
            }
          : null
      );
    });
  }, [value, fetchData]);

  const onInputBlur = useCallback(() => {
    if (value != data?.id) {
      refresh();
    }
  }, [value, data]);

  useEffect(() => {
    if (value) {
      refresh();
    }
  }, []);

  return (
    <DiscordInputField
      value={value}
      onValueChange={onValueChange}
      isLoading={isLoading}
      displayValue={data?.displayName}
      iconUrl={data?.iconUrl}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      onBlur={onInputBlur}
    />
  );
};

export default DiscordAPIInputField;
