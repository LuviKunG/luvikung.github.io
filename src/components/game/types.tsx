interface BlockState {
  value: BlockValue;
  isLocked: boolean;
  isError: boolean;
}

enum BlockValue {
  EMPTY = 0,
  SUN = 1,
  MOON = 2,
}

export { BlockValue };
export type { BlockState };