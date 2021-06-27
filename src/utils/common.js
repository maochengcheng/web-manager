const common = {
    changeDate(time, status) {
        let date = time ? new Date(time) : new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let str = year + '-' + this.addZero(month) + '-' + this.addZero(day);
        if (status) {
            str = str + ' ' + this.addZero(hours) + ':' + this.addZero(minute) + ':' + this.addZero(second);
        }
        return str;
    },
    addZero(number) {
        return number < 10 ? '0' + number : number;
    }
};

export default common;
