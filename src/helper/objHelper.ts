export const removeFalsy = (obj: object): object =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => !!v)
  );
