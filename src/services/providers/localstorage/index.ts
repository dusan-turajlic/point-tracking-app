import BaseProvider from "../base";

const STORE = globalThis.localStorage;

export const STORE_ROOT = 'APP_ROOT';

const createNoDataError = () => new Error('No Data Found');

function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default class LocalStorageProvider extends BaseProvider {
    store = STORE;

    constructor(store = STORE) {
        super();
        this.store = store;
    }
    
    private _getRoot() {
        const item = this.store.getItem(STORE_ROOT);
        if (!item) {
            this.store.setItem(STORE_ROOT, '{}');
            return {};
        }
        return JSON.parse(item);
    }

    async get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = path.split('/');

            let current = root;
            for (const key of keys) {
                if (!current) {
                    reject(createNoDataError());
                    break;
                }

                if (!current[key]) {
                    reject(createNoDataError());
                    current = null
                    break;
                } else {
                    current = current[key];
                }
            }

            if (current) {
                resolve(current as T);
            } else {
                reject(createNoDataError());
            }
        });
    }

    async create<T>(path: string, data: T): Promise<T & {id: string}> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = path.split('/');

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]] as Record<string, unknown>;
                }

                const id = generateUUID();
                if (!current[keys[keys.length - 1]]) {
                    current[keys[keys.length - 1]] = {};
                }
                const newData = {...data, id};
                (current[keys[keys.length - 1]] as Record<string, unknown>)[id] = newData;
                this.store.setItem(STORE_ROOT, JSON.stringify(root));
                resolve(newData);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }

    async update<T>(path: string, data: Partial<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = path.split('/');

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]] as Record<string, unknown>;
                }

                if (!current[keys[keys.length - 1]]) {
                    current[keys[keys.length - 1]] = {};
                }
                const newData = JSON.parse(JSON.stringify({...current[keys[keys.length - 1]], ...data}));
                current[keys[keys.length - 1]] = newData;
                this.store.setItem(STORE_ROOT, JSON.stringify(root));
                resolve(current[keys[keys.length - 1]] as T);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }

    async delete(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = path.split('/');

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]] as Record<string, unknown>;
                }
        
                delete current[keys[keys.length - 1]];
                this.store.setItem(STORE_ROOT, JSON.stringify(root));
                resolve(void 0);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        });
    }

    async reorder(path: string, items: string[]) {
        new Promise((resolve, reject) => {
            const root = this._getRoot();
            const keys = path.split('/');
            const lastKey = keys[keys.length - 1];

            try {
                let current = root;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]] as Record<string, unknown>;
                }

                current[lastKey] = Object.fromEntries(
                    Object.entries(current[lastKey])
                        .sort(([keyA], [keyB]) => items.indexOf(keyA) - items.indexOf(keyB))
                );

                this.store.setItem(STORE_ROOT, JSON.stringify(root));
                resolve(void 0);
            } catch (error) {
                console.error(`cannot find ${path} in storage`, error);
                reject(error);
            }
        })
    }
}