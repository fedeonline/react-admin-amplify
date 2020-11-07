import React from "react";
import { FileField } from "react-admin";
import { useStorageField } from "../hooks/useStorageField";

type Props = {
  source: string;
  record?: any;
  storageOptions?: any;
};

export const AmplifyFileField: React.FC<Props> = ({
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
    <FileField source={`${source}._url`} record={updatedRecord} {...props} />
  );
};
