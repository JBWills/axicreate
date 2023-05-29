type KeyType = string | number | symbol

export function objectKeys<K extends KeyType>(o: Record<K, unknown>): K[] {
  return Object.keys(o) as K[]
}

export function objectValues<V>(o: Record<KeyType, V>): V[] {
  return Object.values(o) as V[]
}

export function objectEntries<K extends KeyType, V>(o: Record<K, V>): Array<[K, V]> {
  return Object.entries(o) as Array<[K, V]>
}
