import { del, get, set, Store } from "idb-keyval";

/**
 * Peramently store data
 * This class allows to store to global store, or to create
 * seperate stores. For global store use static methods.
 * Create new stores to not worry about conflicts.
 */
export class Storage {
  store: Store;

  constructor(store: string) {
    this.store = new Store(`${store}-db`, store);
  }

  static async set(key: string, value: any): Promise<void> {
    return set(key, value);
  }

  static async get<T = any>(key: string): Promise<T> {
    return get<T>(key);
  }

  static async delete(key: string): Promise<void> {
    return del(key);
  }

  async set(key: string, value: any): Promise<void> {
    return set(key, value, this.store);
  }

  async get<T = any>(key: string): Promise<T> {
    return get<T>(key, this.store);
  }

  async delete(key: string): Promise<void> {
    return del(key, this.store);
  }
}
