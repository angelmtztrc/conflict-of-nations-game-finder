# Conflict of Nations - Game Finder

A chrome-extension to help you find new games in Conflict of Nations more easily.

## Run Locally

> ⁉️ The extension is not yet available in the Chrome Web Store (it will be soon), so, you'll have to set it up locally in your browser.

> ⁉️ You'll need to install Node.js in your machine to compile this project and use it. This is temporary.

First, clone this repository into your local machine using the following command via terminal.

```sh
git clone https://github.com/angelmtztrc/conflict-of-nations-game-finder
# or
git clone git@github.com:angelmtztrc/conflict-of-nations-game-finder.git

# then
cd conflict-of-nations-game-finder
```

Next, install all of the dependencies of the project using NPM or Yarn.

```sh
npm install
# or
yarn install
```

Now, create a bundle of the project by running the following command:

```sh
npm run build
# or
yarn build
```

After that, you'll have a `dist` folder available in the project files.

Go to `chrome://extensions/`, make sure you have the `developer mode` enabled, and then, click the `Load unpacked` button.

Select the entire `dist` folder and continue. Now, the extension should be available to use in your browser.
