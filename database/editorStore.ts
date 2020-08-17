import db from './db.ts'

interface IStore {
    id?: string;
    timeStamp: string;
    events: Array<any>;
}

export const editorDB = db.editor;

export const editorStore = db.table<IStore>('editor');

export function get(id: string) {
    return editorStore.get(id);
}

export function put(data: IStore) {
    return editorStore.put(data);
}

export function update(data: IStore) {
    return editorStore.update(data.id, data);
}

export function remove(id: string) {
    return editorStore.delete(id);
}

export function clear() {
    return editorStore.clear();
}