'use strict';

const BaseVehicleService = require('./vehiclesBase.service');


class CarService extends BaseVehicleService {
    constructor() {
        super("car");
    }

    createVehicle(data){
        return{
            ...data,
            vehicleType:"car",
            maxSeats:data.SoGheToiDa||5,
            maSoXe:data.MaSoXe|| "N/A"
        }

    }
}

class BusService extends BaseVehicleService {
    constructor() {
        super("bus");
    }

    createVehicle(data){
        return{
            ...data,
            vehicleType:"bus",
            maxSeats:data.SoGheToiDa||50,
            maSoXe:data.MaSoXe|| "N/A"
        }

    }
}

class TrainService extends BaseVehicleService {
    constructor() {
        super("train");
    }

    createVehicle(data){
        return{
            ...data,
            vehicleType:"train",
            maxSeats:200,
            maSoXe:"N/A"
        }

    }
}

module.exports = {
    CarService,
    BusService,
    TrainService
}