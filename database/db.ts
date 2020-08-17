import Dexie from 'dexie'

const db = new Dexie('myDatabase');
db.version(1).stores({
    editor: `
        ++id,
        timeStamp,
        events
    `
});

export default db;