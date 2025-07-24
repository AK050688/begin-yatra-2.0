const getEnv = (key) => {
  return import.meta.env[key] ?? "";
};

export default getEnv;
