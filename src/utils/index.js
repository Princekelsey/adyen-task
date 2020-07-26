export const composeResponseData = (locations) => {
  const newData = [{ value: null, text: "Please select" }];
  locations.forEach((location) => {
    const newObject = { value: location.code, text: location.name };
    newData.push(newObject);
  });

  return newData;
};
