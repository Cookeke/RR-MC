export function pushToStorage() {
    let _events = [];
    const storage = this.getStorage();
    _events = [].concat(storage ? storage._events : [], this.events);
    this.setStorage(_events);
}

export function getStorage(item = 'rrwebStroage') {
    return JSON.parse(localStorage.getItem(item));
}

export function setStorage(_events, item = 'rrwebStroage') {
    localStorage.setItem(item, JSON.stringify({ _events }));
}

export function removeStorage(item = 'rrwebStroage') {
    localStorage.removeItem(item);
}