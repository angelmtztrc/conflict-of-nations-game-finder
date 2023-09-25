import { getSortedTiles } from '../utils/tiles.util';

const handleMutation: MutationCallback = mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const targetElement = mutation.target as HTMLElement;
      if (targetElement.classList.contains('state_active')) {
        if (targetElement.textContent === 'New Games') {
          chrome.runtime.sendMessage(true);
        } else {
          chrome.runtime.sendMessage(false);
        }
      }
    }
  }
};
const root = document.querySelector('#ifm') as HTMLIFrameElement;
const tabs = root.contentDocument?.querySelectorAll('.sub_menu_link') ?? [];
const observer = new MutationObserver(handleMutation);

tabs.forEach(el => {
  observer.observe(el, { attributes: true, attributeFilter: ['class'] });
});

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

      document.body.appendChild(overlay);

      const main = rootBody.querySelector('#s1914') as HTMLElement;
      const container = main.querySelector('#func_game_tiles') as HTMLElement;

      getSortedTiles(container, rootHtml, request.settings, () => {
        document.body.removeChild(overlay);
        // @ts-ignore
        sendResponse({ isFinished: true });
      });
    }

    return true;
  }

  return true;
});
