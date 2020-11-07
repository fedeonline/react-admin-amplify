import React from "react";
import { ImageField } from "react-admin";
import { useStorageField } from "../hooks/useStorageField";

type Props = {
  source: string;
  record?: any;
  storageOptions?: any;
};

export const AmplifyImageField: React.FC<Props> = ({
  source,
  record = {},
  storageOptions = {},
  ...props
}) => {
  const { url } = useStorageField({ source, record, storageOptions });

  if (!url) {
    return null;
  }

  const updatedRecord = { ...record };
  updatedRecord[source]._url = url;

  return (
    <ImageField source={`${source}._url`} record={updatedRecord} {...props} />
  );
};
