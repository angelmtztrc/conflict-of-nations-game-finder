export const startInfiniteScroll = (el: HTMLElement) => {
  return new Promise(resolve => {
    el.scrollTo(0, el.scrollHeight);
    setTimeout(() => resolve(true), 1000);
  });
};

export const getManyTiles = async (
  containerEl: HTMLElement,
  htmlEl: HTMLElement
) => {
  let allTiles: Element[] = [];
  let currentTiles = 0;
  let keepFetching = true;

  while (keepFetching) {
    const tiles = containerEl.querySelectorAll('.game-tile');
    if (tiles.length === currentTiles) {
      keepFetching = false;
      allTiles = Array.from(tiles);
    }

    currentTiles = tiles.length;
    await startInfiniteScroll(htmlEl);
  }

  return allTiles;
};

export const getOccupiedSlotsFromTile = (el: HTMLElement) => {
  const value = el.querySelector('.number-of-players')?.textContent ?? '0/0';

  return Number(value.split(' / ')[0] ?? 0);
};

export const isFilled = (el: HTMLElement) => {
  const value = el.querySelector('.number-of-players')?.textContent ?? '0/0';

  const occupiedSlots = value.split(' / ')[0] ?? 0;
  const totalSlots = value.split(' / ')[1] ?? 0;

  return Boolean(occupiedSlots === totalSlots);
};

export const getSortedTiles = async (
  container: HTMLElement,
  rootHtml: HTMLElement,
  cb: () => void
) => {
  const tiles = await getManyTiles(container, rootHtml);

  const filteredSlots = tiles.filter(el => isFilled(el as HTMLElement));
  const sortedTiles = filteredSlots.sort((leftEl, rightEl) => {
    // TODO: CREATE A FUNCTION THAT RETURNS THE INFORMATION OF A TILE
    const leftTilePlayers = getOccupiedSlotsFromTile(leftEl as HTMLElement);
    const rightTilePlayers = getOccupiedSlotsFromTile(rightEl as HTMLElement);

    if (leftTilePlayers < rightTilePlayers) return -1;
    if (leftTilePlayers > rightTilePlayers) return 1;

    return 0;
  });

  // scroll to the top of the page
  rootHtml.scrollTo(0, 0);

  // delete old tiles and inject the sorted ones
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  sortedTiles.forEach(el => container.appendChild(el));
  cb();
};
