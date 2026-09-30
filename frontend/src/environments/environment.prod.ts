declare global {
  interface Window {
    __PORTFOLIO_CONFIG__?: {
      apiUrl?: string;
    };
  }
}

export const environment = {
  production: true,
  // Injetado por public/runtime-config.js, gerado pelo script prebuild.
  apiUrl:
    window.__PORTFOLIO_CONFIG__?.apiUrl ??
    'https://portfolio-arthur-api.onrender.com/api'
};
