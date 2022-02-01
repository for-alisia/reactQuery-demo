interface Data {
  [key: string]: {
    [key: string]: any;
  };
}

export const mapToList = (data: Data) => {
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};
