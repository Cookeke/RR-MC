import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

import * as editorStore from '../database/editorStore.ts'

class Replay {
    constructor(options) {
        this.events = [];
        this.replay()
    }
    async replay() {
        // 为空则获取数据
        this.events.length === 0 && await this.getIndexDB();
        if (this.events.length >= 2) {
            const { events } = this;
            this.rrwebPlayer = new rrwebPlayer({
                // Todo: user can change target ele
                target: document.body,
                data: { events, },
            });
        } else {
            console.error('数据为空');
        }
    }
    async getIndexDB() {
        const tempArr = [];
        await editorStore.editorDB.each(data => tempArr.push(data.events));
        this.events = tempArr.flat(Infinity);
    }
    static close() {
        const child = document.getElementsByClassName('rr-player')[0];
        if (child) {
            const body = child.parentNode;
            body.removeChild(child);
        }
        return;
    }
}
export default Replay;

