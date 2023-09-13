const triggerInfiniteScroll = (el: HTMLElement) => {
  return new Promise(resolve => {
    el.scrollTo(0, el.scrollHeight);
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

const fetchTiles = async (container: HTMLElement, iframeHtml: HTMLElement) => {
  let allTiles: Element[] = [];
  let currentTiles = 0;
  let keepFetching = true;

  while (keepFetching) {
    const tiles = container.querySelectorAll('.game-tile');
    if (tiles.length === currentTiles) {
      keepFetching = false;
      allTiles = Array.from(tiles);
    }

    currentTiles = tiles.length;
    await triggerInfiniteScroll(iframeHtml);
  }
  return allTiles;
};

const getAvailableSlots = (text: string) => {
  return Number(text.split(' / ')[0] ?? 0);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'start') {
    const iframe = document.querySelector('#ifm') as HTMLIFrameElement;
    const iframeHtml = iframe.contentDocument?.querySelector('html');
    const iframeBody = iframe.contentDocument?.querySelector('body');

    if (iframeHtml && iframeBody) {
      const main = iframeBody.querySelector('#s1914') as HTMLElement;
      const container = main.querySelector('#func_game_tiles') as HTMLElement;

      (async () => {
        const tiles = await fetchTiles(container, iframeHtml);

        const sortedTiles = tiles.sort((leftTile, rightTile) => {
          const leftTilePlayers = getAvailableSlots(
            leftTile.querySelector('.number-of-players')?.textContent as string
          );

          const rightTilePlayers = getAvailableSlots(
            rightTile.querySelector('.number-of-players')?.textContent as string
          );

          return leftTilePlayers - rightTilePlayers;
        });

        iframeHtml.scrollTo(0, 0);

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        sortedTiles.forEach(el => container.appendChild(el));
        sendResponse({ isFinished: true });
      })();
    }
  }

  return true;
});
