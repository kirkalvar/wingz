export default ({ config }) => {
  const isDev = process.env.NODE_ENV === "development";

  return {
    ...config,
    extra: {
      eas: {
        projectId: "",
      },
      // Use a local `.env` file for the development environment,
      // and EAS Build secrets for the production environment.
      GOOGLE_MAP_API_KEY: isDev
        ? process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY
        : process.env.EXPO_SECRET_GOOGLE_MAP_API_KEY,
    },
  };
};
