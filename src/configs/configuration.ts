export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    weatherAPIKey: process.env.WEATHER_API_KEY,
  });