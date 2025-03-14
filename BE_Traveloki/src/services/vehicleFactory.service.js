'use strict'
const { CarService, BusService, TrainService } = require('./vehiclesType.service')


class VehicleFactory{
    static createVehicle(type){
        switch(type){
            case "car":
                return new CarService()
            case "bus":
                return new BusService()
            case "train":
                return new TrainService()
            default:
                throw new Error("Vehicle type ${type} is not supported")
        }
    }
}

module.exports = VehicleFactory