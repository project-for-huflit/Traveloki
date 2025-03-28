const Vehicle = require('./vehicle.service');

class Train extends Vehicle {
    constructor(options){
        super(options);
    }

    info(){
        console.log(`${this.tenPhuongTien} (${this.maSoXe}) - ${this.soGheToiDa}`);
    }
}

module.exports = Train;