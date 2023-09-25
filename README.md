# Conflict of Nations - Game Finder

A chrome-extension to help you find new games in Conflict of Nations more easily.

> ⁉️ The extension is not yet available in the Chrome Web Store (it will be soon), so, you'll have to set it up locally in your browser.

## Set up

Go to the [releases section](https://github.com/angelmtztrc/conflict-of-nations-game-finder/releases) on the GitHub repository and download the `dist.zip` file from the latest version.

Unzip the file in your location of preferences.

Then, go to `chrome://extensions/`, make sure you have the `developer mode` enabled, and then, click the `Load unpacked` button.

Select the entire `dist` folder and continue. Now, the extension should be available to use in your browser.

## Run Locally

> ⁉️ You'll need to install Node.js in your machine to compile this project and use it.

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

> ⁉️ This is a work-in-progress project, so, there may be unhandled errors when using it.

> ⁉️ To run it successfully, make sure you're in the `New Games` tab in Conflict of Nations.
