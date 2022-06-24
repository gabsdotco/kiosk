### @kiosk

This a monorepository for a kiosk management platform. The main purpose of this monorepo is to keep the codebase clean and easy to maintain. That way we can group code that is shared between multiple apps.

### Structure

The monorepository is divided into three main groups of packages:

- **/apps**: here you can find the main applications of the kiosk project.
  - **/apps/web**: the front-end of the project.
  - **/apps/api**: the back-end of the project.
- **/config**: here you can find reusable configuration files shared between packages.
  - **/config/eslint**: the custom eslint configuration as a pattern.
  - **/config/postcss**: the custom postcss configuration as a pattern.
  - **/config/tailwind**: the custom tailwind configuration as a pattern.
  - **/config/tsconfig**: the custom tsconfig configuration as a pattern.
- **/shared**: here you can find a minimal and reusable design system.
  - **/shared/ui**: all the components of the design system.
  - **/shared/styles**: all the styles and tokens of the design system.

### Usage

To start using that project you need first to install all the dependencies using the command bellow:

```bash
yarn # npm install
```

After that you can start using the project running one of theses commands bellow:

```bash
yarn dev # to start the api & front-end development server
yarn lint # to lint all the available packages for linting
yarn build # to build all the available packages for build
yarn format # to format all the files using Prettier
```
