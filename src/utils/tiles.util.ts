import { ITile } from '../interfaces/tile.interface';

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

export const getTileProperties = (el: HTMLElement): ITile => {
  const name = el.querySelector('header > h2')?.textContent ?? '';
  const numberOfPlayers =
    el.querySelector('.number-of-players')?.textContent ?? '0 / 0';
  const gameId = Number(
    el.querySelector('.game-tile-right-column > span')?.textContent ?? 0
  );

  const isSpecial =
    (el.querySelector('.game-highlight-tag')?.textContent ?? '') ===
    'Special Event';
  const is4XSpeed = name.includes('4X');
  const is10XSpeed = name.includes('10X');

  const occupiedSlots = Number(numberOfPlayers.split(' / ')[0] ?? 0);
  const totalSlots = Number(numberOfPlayers.split(' / ')[1] ?? 0);

  return {
    name,
    gameId,
    isSpecial,
    is4XSpeed,
    is10XSpeed,
    occupiedSlots,
    totalSlots
  };
};

export const getOccupiedSlotsFromTile = (el: HTMLElement) => {
  const value = el.querySelector('.number-of-players')?.textContent ?? '0/0';

  return Number(value.split(' / ')[0] ?? 0);
};

export const isFilled = (tile: ITile) => tile.totalSlots === tile.occupiedSlots;

export const getSortedTiles = async (
  container: HTMLElement,
  rootHtml: HTMLElement,
  settings: {
    filter: string;
    removeFull: boolean;
  },
  cb: () => void
) => {
  const tiles = await getManyTiles(container, rootHtml);

  let finalTiles: Element[] = [...tiles];

  if (settings.filter === 'X4-ONLY') {
    finalTiles = finalTiles.filter(tile => {
      const properties = getTileProperties(tile as HTMLElement);
      return properties.is4XSpeed;
    });
  }

  if (settings.filter === 'SPECIAL-ONLY') {
    finalTiles = finalTiles.filter(tile => {
      const properties = getTileProperties(tile as HTMLElement);
      return properties.isSpecial;
    });
  }

  if (settings.removeFull) {
    finalTiles = finalTiles.filter(
      el => !isFilled(getTileProperties(el as HTMLElement))
    );
  }
  console.log(finalTiles);
  const sortedTiles = finalTiles.sort((leftEl, rightEl) => {
    const leftTileProperties = getTileProperties(leftEl as HTMLElement);
    const rightTileProperties = getTileProperties(rightEl as HTMLElement);

    if (leftTileProperties.occupiedSlots < rightTileProperties.occupiedSlots)
      return -1;

    if (leftTileProperties.occupiedSlots > rightTileProperties.occupiedSlots)
      return 1;

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
