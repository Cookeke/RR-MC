import { record } from 'rrweb';
import * as editorStore from '../database/editorStore.ts'
import * as storage from '../util/storage'
import * as API from '../service/api'

class Record {
    constructor(options) {
        // this.eventsMatrix = [[]];
        // this.interval = 15000;
        // this.timeOut = null;
        // this.countTime();

        this.events = [];
        this.stopFn = '';
        this.tempArr = [];
        this.pin = '暂未获取到pin';


        this.getPin();
        this.startRecord();
    }

    startRecord() {
        this.stopFn = new record({
            emit: (event, isCheckout) => {
                if (isCheckout) this.submit();
                this.pushEvent(event);
            },
            checkoutEveryNms: 1000 * 3, // 1分钟
        });
    }

    async pushEvent(event) {
        this.events.push(event);
        await this.pushIndexDB();
        this.events.length = 0;
    }

    async pushIndexDB() {
        const timeStamp = new Date().getTime();
        const { events } = this;
        await editorStore.put({ timeStamp, events });
    }

    async submit() {
        await this.pushEvent();
        await this.fetch();
        await this.clearIndexDB();
    }

    async fetch() {
        await this.recordData();
        const recordData = this.tempArr;
        const { beginTime, endTime } = this.getTime();
        const data = {
            pin: this.pin,
            beginTime,
            endTime,
            recordData
        }
        console.log(data)
        
        // const response = await API.createUserData(data);
        // console.log(response);

        // response.isSuccess && response.code === '200'
        //     ? this.handleSuccess(response)
        //     : this.handleError(response.message);
    }

    async recordData(){
        this.tempArr.length = 0;
        await editorStore.editorDB.each(data => this.tempArr.push(data.events));
        this.tempArr = this.tempArr.flat(Infinity);
    }

    getPin(){
        
    }

    getTime(){
        const { tempArr } = this;
        const beginTime = this.ifUndefined(0, true, tempArr);
        const endTime = this.ifUndefined(length - 1, false, tempArr);
        return { beginTime, endTime }
    }

    ifUndefined(length,begin,tempArr){
        let i = length;
        while(tempArr[i] == undefined){
            begin ? i++ : i-- ;
        }
        return tempArr[i].timestamp;
    }

    async clearIndexDB(){
        await editorStore.clear();
    }

    handleSuccess(){
        console.log('上传成功');
    }

    handleError(message){
        console.error(message);
    }

    stop() {
        this.stopFn();
    }

    countTime() {
        if (this.timeOut !== null) {
            this.submit();
            this.clearEvent();
        }
        this.timeOut = setTimeout(() => this.countTime(), this.interval);
    }

    clearEvent() {
        this.events.length = 0;
        clearTimeout(this.timeOut);
        this.timeOut = null;
        this.destory();
    }
}
export default Record;
