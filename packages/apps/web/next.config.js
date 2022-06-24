const withTM = require('next-transpile-modules')(['@kiosk/ui']);

module.exports = withTM({
  reactStrictMode: true,
});
