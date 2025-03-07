module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '8.0.3',
      skipMD5: false,
    },
    autoStart: false,
    instance: {
      port: 41148
    },
  },
};
