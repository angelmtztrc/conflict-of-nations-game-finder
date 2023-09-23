import { getSortedTiles } from '../utils/tiles.util';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'isReady') {
    const root = document.querySelector('#ifm') as HTMLIFrameElement;
    const rootHtml = root.contentDocument?.querySelector('html');
    const rootBody = root.contentDocument?.querySelector('body');

    const canContinue = rootHtml && rootBody;
    if (canContinue) {
      const main = rootBody.querySelector('#s1914') as HTMLElement;
      const isNewGamesActive = main.querySelector(
        '.sub_menu_link.state_active'
      )?.textContent;

      if (isNewGamesActive && isNewGamesActive === 'New Games') {
        // @ts-ignore
        sendResponse({ isReady: true });
      } else {
        // @ts-ignore
        sendResponse({ isReady: false });
      }

      return true;
    }
    // @ts-ignore
    sendResponse({ isReady: false });

    return true;
  }

  if (request.action === 'start') {
    const root = document.querySelector('#ifm') as HTMLIFrameElement;
    const rootHtml = root.contentDocument?.querySelector('html');
    const rootBody = root.contentDocument?.querySelector('body');

    const canContinue = rootHtml && rootBody;
    if (canContinue) {
      const overlay = document.createElement('div');
      (() => {
        const styles = {
          position: 'fixed',
          display: 'block',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000
        };

        Object.entries(styles).forEach(([key, value]) => {
          // @ts-ignore
          overlay.style[key] = value;
        });
      })();
      console.log(overlay);
      document.body.appendChild(overlay);

      const main = rootBody.querySelector('#s1914') as HTMLElement;
      const container = main.querySelector('#func_game_tiles') as HTMLElement;

      getSortedTiles(container, rootHtml, () => {
        // @ts-ignore
        sendResponse({ isFinished: true });
      });

      document.body.removeChild(overlay);
    }

    return true;
  }

  return true;
});
