import { getSortedTiles } from '../utils/tiles.util';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'start') {
    const root = document.querySelector('#ifm') as HTMLIFrameElement;
    const rootHtml = root.contentDocument?.querySelector('html');
    const rootBody = root.contentDocument?.querySelector('body');

    // TODO: VALIDATE IF WE ARE IN THE NEW GAME TAB

    const canContinue = rootHtml && rootBody;
    if (canContinue) {
      const main = rootBody.querySelector('#s1914') as HTMLElement;
      const container = main.querySelector('#func_game_tiles') as HTMLElement;

      getSortedTiles(container, rootHtml, () => {
        // @ts-ignore
        sendResponse({ isFinished: true });
      });
    }

    return true;
  }

  return true;
});
