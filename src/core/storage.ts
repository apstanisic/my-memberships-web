import * as idb from "idb-keyval";

/**
 * Peramently store data
 * This class allows to store to global store, or to create
 * seperate stores. For global store use static methods
 */
export default class Storage {
  store: idb.Store;

  constructor(store: string) {
    this.store = new idb.Store(`${store}-db`, store);
  }

  static async set(key: string, value: any): Promise<void> {
    return idb.set(key, value);
  }

  static async get<T = any>(key: string): Promise<T> {
    return idb.get<T>(key);
  }

  static async delete(key: string): Promise<void> {
    return idb.del(key);
  }

  async set(key: string, value: any): Promise<void> {
    return idb.set(key, value, this.store);
  }

  async get<T = any>(key: string): Promise<T> {
    return idb.get<T>(key, this.store);
  }

  async delete(key: string): Promise<void> {
    return idb.del(key, this.store);
  }
}
