export interface ITile {
  name: string;
  gameId: number;
  isSpecial: boolean;
  is4XSpeed: boolean;
  is10XSpeed: boolean;
  occupiedSlots: number;
  totalSlots: number;
}
