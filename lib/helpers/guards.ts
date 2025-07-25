export function isUndefined(value: unknown): value is undefined | null {
  return value === undefined || value === null
}

export function checkExhaustive(value: never) {
  return value
}
