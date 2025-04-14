/* eslint-disable @typescript-eslint/no-explicit-any */
interface ENV {
  [key: string]: any;
}

const env: ENV = {
  baseGatewayUrl: import.meta.env.VITE_REACT_APP_BASE_GATEWAY_URL
};

export default env;