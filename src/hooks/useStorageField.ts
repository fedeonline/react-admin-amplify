import { Storage } from "@aws-amplify/storage";
import React from "react";

type Input = {
  source: string;
  record?: any;
  storageOptions?: any;
};

type Output = {
  url: string | null;
};

export function useStorageField({
  source,
  record = {},
  storageOptions = {},
}: Input): Output {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    Storage.get(record[source].key, storageOptions)
      .then((signedURL) => {
        if (typeof signedURL === "string") {
          setUrl(signedURL);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { url };
}
