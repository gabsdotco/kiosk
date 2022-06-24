module.exports = {
  root: true,
  extends: ['@kiosk/eslint-config'],
  settings: {
    next: {
      rootDir: ['packages/apps/*/'],
    },
  },
};
