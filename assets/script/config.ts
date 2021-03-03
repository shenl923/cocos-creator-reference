
const prodConfig = {
  API_ROOT: 'https://gate.4399.com',
  WS_ROOT: 'ws://gate.4399.com',
  IS_DEV: false,
  VERSION: "0.0.1",

}

const devConfig: typeof prodConfig = {
  ...prodConfig,
  API_ROOT: 'localhost:3000',
  IS_DEV: true,
}

var isDev = true;

export const config = isDev ? devConfig : prodConfig